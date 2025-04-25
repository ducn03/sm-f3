<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { UI_CONSTANT } from '$f3/constant/ui-constant'
  
    export let value: string = '';
    export let label: string;
    export let placeholder: string | undefined = undefined;
    export let type: string = 'text';
    export let disabled: boolean = false;
    export let id: string;
    export let labelStyle: 'floating' | 'stacked' | 'inline' = 'floating';
    export let bgColor: string = 'bg-white';
    export let required: boolean = false;
    export let focusColor: string = 'purple';
  
    // New prop to trigger validation on form submit
    let submitted: boolean = false;
  
    export let validationFn: ((val: string) => string | null) | undefined = undefined;
    export let externalError: string | null = null;
    export let requiredError: string | null = null;
  
    let touched: boolean = false;
    let isFocused: boolean = false;
    let internalError: string | null = null;
  
    const dispatch = createEventDispatcher();
  
    function handleFocus() {
      isFocused = true;
      dispatch('focus');
    }
  
    function handleBlur() {
      isFocused = false;
      touched = true;
      validateInput();
      dispatch('blur');
    }
  
    function handleInput(event: Event) {
      if (touched || externalError) {
        validateInput();
      }
      dispatch('input', event);
    }
  
    function validateInput() {
      if (validationFn) {
        internalError = validationFn(value);
      } else if (required && !value.trim()) {
        internalError = requiredError != null ? requiredError : `${label} không được để trống`;
      } else {
        internalError = null;
      }
    }
  
    // Trigger validation when parent signals submit
    $: if (submitted && !touched) {
      touched = true;
      validateInput();
    }
  
    // Re-validate if value or external error changes after touch or submit
    $: if ((value !== undefined || externalError !== undefined) && (touched || submitted)) {
      validateInput();
    }
  
    $: finalError = externalError || internalError;
    $: isValid = value.trim().length > 0 && !finalError;

    onMount(() => {
        const listener = () => {
        touched = true;
        validateInput();
        };
        window.addEventListener(UI_CONSTANT.form, listener);
        return () => window.removeEventListener(UI_CONSTANT.form, listener);
    });
  
    // Dispatch validation result on changes
    $: {
      dispatch('validationResult', { id, hasError: !!finalError, errorMessage: finalError });
    }
  
    // Dynamic focus and validation border classes
    $: focusClass = `border-${focusColor}-500 focus:border-${focusColor}-500 dark:border-${focusColor}-500 dark:focus:border-${focusColor}-500`;
    $: labelFocusClass = `text-${focusColor}-600 dark:text-${focusColor}-500`;
  
    // Updated input padding and height for consistent sizing
    $: inputClasses = `
      peer block w-full rounded-lg px-2.5 py-3 h-12 text-sm text-gray-900
      ${bgColor} border appearance-none dark:text-white focus:outline-none focus:ring-0
      ${disabled ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}
      ${finalError ? 'border-red-500 focus:border-red-500 dark:border-red-500' :
        isFocused ? focusClass :
        isValid && touched ? 'border-green-500 focus:border-green-500 dark:border-green-500' :
        'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500'}
    `;
  
    // Floating label classes remain the same
    $: labelClasses = `
      absolute text-sm text-gray-500 dark:text-gray-400 duration-200 transform scale-75 origin-[0] z-10 bg-white dark:bg-gray-700 px-1
      left-2.5 -top-2
      peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-placeholder-shown:left-2.5
      peer-focus:scale-75 peer-focus:-top-2
      ${finalError ? 'text-red-600 dark:text-red-500' : ''}
      ${isValid && touched ? 'text-green-600 dark:text-green-500' : ''}
      ${isFocused ? labelFocusClass : ''}
    `;
  </script>
  
  {#if labelStyle === 'inline'}
    <div class="flex items-center gap-4">
      <label for={id} class="text-sm font-medium whitespace-nowrap">{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        class={inputClasses + ' ' + ($$props.class || '')}
        placeholder={placeholder || ''}
        bind:value
        {disabled}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:input={handleInput}
      />
      {#if finalError}
        <p class="text-xs mt-0 ml-0 text-red-500 dark:text-red-500">{finalError}</p>
      {/if}
    </div>
  {:else if labelStyle === 'stacked'}
    <div class="w-full">
      <label for={id} class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        name={id}
        id={id}
        class={inputClasses + ' ' + ($$props.class || '')}
        placeholder={placeholder || ''}
        bind:value
        {disabled}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:input={handleInput}
      />
      {#if finalError}
        <p class="text-xs mt-0 ml-0 text-red-500 dark:text-red-500">{finalError}</p>
      {/if}
    </div>
  {:else}
  <!-- custom-floating-input -->
    <div class="relative w-full group">
      <input
        type={type}
        name={id}
        id={id}
        class={inputClasses + ' ' + ($$props.class || '')}
        placeholder={placeholder || ' '}
        bind:value
        {disabled}
        on:focus={handleFocus}
        on:blur={handleBlur}
        on:input={handleInput}
      />
      <label for={id} class={labelClasses}>{label}</label>
      {#if finalError}
        <p class="text-xs mt-0 ml-0 text-red-500 dark:text-red-500">{finalError}</p>
      {/if}
    </div>
  {/if}
  