<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import type { FullAutoFill } from 'svelte/elements';

    // --- Props ---
    export let id: string = '';
    export let name: string = '';
    export let type: string = 'text';
    export let placeholder: string = '';
    // Sử dụng bind:value để ràng buộc 2 chiều
    export let value: string = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let required: boolean = false;
    export let error: string = '';
    export let label: string = '';
    export let helpText: string = '';
    export let icon: typeof SvelteComponent | null = null;
    export let iconPosition: 'left' | 'right' = 'left';
    export let autocomplete: FullAutoFill = 'off';
    export let min: string | number = '';
    export let max: string | number = '';
    export let step: string | number = '';
    export let pattern: string = '';

    // Không cần createEventDispatcher nữa nếu chỉ chuyển tiếp sự kiện DOM
    // import { createEventDispatcher } from 'svelte';
    // const dispatch = createEventDispatcher();

    // Hàm handleInput cũng không cần thiết nếu dùng bind:value và event forwarding
    // function handleInput(event: Event) {
    //   const target = event.target as HTMLInputElement;
    //   value = target.value; // bind:value làm việc này tự động
    //   // dispatch('input', value); // Sẽ dùng on:input để forward
    // }

</script>

<div class="w-full">
    {#if label}
      <label for={id} class="block mb-1 font-medium text-gray-700">
        {label}
        {#if required} <span class="text-red-500">*</span> {/if}
      </label>
    {/if}

    <div class="relative">
      {#if icon && iconPosition === 'left' && typeof icon === 'function'}
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svelte:component this={icon} class="h-5 w-5 text-gray-500" />
        </div>
      {/if}

      <input
        {id}
        {name}
        {type}
        {placeholder}
        {disabled}
        {readonly}
        {required}
        {pattern}
        {autocomplete}
        bind:value={value}
        min={min.toString()}
        max={max.toString()}
        step={step.toString()}
        class="w-full rounded-md border {error ? 'border-red-500' : 'border-gray-300'} shadow-sm
          {icon && iconPosition === 'left' ? 'pl-10' : 'pl-3'}
          {icon && iconPosition === 'right' ? 'pr-10' : 'pr-3'}
          py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed"
        class:border-red-500={error}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}

        on:input
        on:change
        on:focus
        on:blur
        on:keydown
        on:keyup
        on:click
        on:mouseover
        on:mouseout
      />

      {#if icon && iconPosition === 'right' && typeof icon === 'function'}
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svelte:component this={icon} class="h-5 w-5 text-gray-500" />
        </div>
      {/if}
    </div>

    {#if error}
      <p id={`${id}-error`} class="mt-1 text-sm text-red-600">{error}</p>
    {:else if helpText}
      <p id={`${id}-help`} class="mt-1 text-sm text-gray-500">{helpText}</p>
    {/if}
  </div>