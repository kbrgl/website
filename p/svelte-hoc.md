---
title: Higher-order components in Svelte
subtitle: Emulating the React function-as-child pattern.
date: 2022-07-17
---

How do you do higher order components in Svelte?

In React, you will often pass a function as a child when you want to customize the component rendered by an external library. This allows the external library to pass some arguments that your custom component can use. For example, this example from the `react-hot-toast` docs enables you to render custom toasts:

```jsx
<Toaster>
  {(toast) => (
    <div
      style={{
        opacity: toast.visible ? 1 : 0,
        background: "white",
        padding: 8,
      }}
    >
      {toast.message}
    </div>
  )}
</Toaster>
```

The Toaster component will get a `children` prop of type `(toast: Toast) => JSX.Element` when this code runs.

This won't directly translate to Svelte, because Svelte doesn't let you define a component inline. It has to be in a `.svelte` file. But we can still accomplish the same goal in several different ways.


## Method 1: A Component prop

The first way to emulate the example from above is the following:

```html
<!-- In Toaster.svelte -->
<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    export let Component: SvelteComponent | null = null;
    const toast = {
        message: 'Hello, world!',
        visible: true
    };
</script>

<svelte:component this={Component} toast={toast} />
```

You can also pass an element to `Component` which it can use through a slot:

```html
<svelte:component this={Component} toast={toast}>
  <ToastIcon {toast} slot="icon" />
</svelte:component>
```

This setup can be used this way:

```html
<!-- In MyComponent.svelte -->
<script lang="ts">
    export let toast: Toast;
</script>

<div class={toast.visible ? `block` : `hidden`}>
    <slot name="icon"></slot>
    {toast.message}
</div>

<!-- Now, pass MyComponent to Toaster -->
<Toaster Component={MyComponent} />
```

## Method 2: Slot your own component

In the previous approach, we used a prop to pass in a component that has a slot. We can also just add a slot to our own component:

```html
<!-- In Toaster.svelte -->
<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    export let Component: SvelteComponent | null = null;
    const toast = {
        message: 'Hello, world!',
        visible: true
    };
</script>

<slot {toast}>
    <!-- Fallback content -->
</slot>
```

Like the previous approach, you can also provide children to the slotted component. This time, though, you have to use props on the slot: 

```html
<slot {toast} {ToastIcon}>
    <!-- Fallback content -->
</slot>
```

Now, use `Toaster` as follows:

```html
<!-- In MyComponent.svelte -->
<script lang="ts">
    export let ToastIcon: ToastIcon;
    export let toast: Toast;
</script>

<div class={toast.visible ? `block` : `hidden`}>
    <svelte:component this={ToastIcon} />
    {toast.message}
</div>

<!-- Now, pass MyComponent to Toaster -->
<Toaster let:ToastIcon={ToastIcon}>
    <MyComponent {ToastIcon} />
</Toaster>
```

---

You can see these approaches at work in [svelte-french-toast](https://github.com/kbrgl/svelte-french-toast/blob/c71e38a565966665bb56787e28caccad1a5ea152/src/lib/components/ToastBar.svelte#L29), which uses conditional rendering to enable the use of either approach based on the preferences of the library user.

For further reading, check out the Svelte tutorial on [slots](https://svelte.dev/tutorial/slots) and [`<svelte:component>`](https://svelte.dev/tutorial/svelte-component).
