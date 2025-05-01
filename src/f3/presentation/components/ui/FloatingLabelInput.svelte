<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { UI_CONSTANT } from '$f3/constant/ui-constant';

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
  export let successColor: string = 'green';
  export let errorColor: string = 'red';
  export let successMessage: string | null = null;
  export let focusMessage: string | null = null;

  export let autocomplete: FullAutoFill | null | undefined = undefined;
  type FullAutoFill = 'on' | 'off' | 'name' | 'email' | 'tel' | 'url' | 'current-password';
  let autoCompleteValue: FullAutoFill | null = autocomplete || (type === 'password' ? 'current-password' : 
                                                               type === 'email' ? 'email' :
                                                               type === 'tel' ? 'tel' :
                                                               type === 'url' ? 'url' : 'off');

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

  $: if (submitted && !touched) {
    touched = true;
    validateInput();
  }

  $: if ((value !== undefined || externalError !== undefined) && (touched || submitted)) {
    validateInput();
  }

  $: finalError = externalError || internalError;
  $: isValid = value.trim().length > 0 && !finalError;

  $: autoCompleteValue = autocomplete || (type === 'password' ? 'current-password' : 
                                       type === 'email' ? 'email' :
                                       type === 'tel' ? 'tel' :
                                       type === 'url' ? 'url' : 'off');

  onMount(() => {
    const listener = () => {
      touched = true;
      validateInput();
    };
    window.addEventListener(UI_CONSTANT.form, listener);
    return () => window.removeEventListener(UI_CONSTANT.form, listener);
  });

  $: dispatch('validationResult', { id, hasError: !!finalError, errorMessage: finalError });

  $: focusClass = `border-${focusColor}-500 focus:border-${focusColor}-500 dark:border-${focusColor}-500 dark:focus:border-${focusColor}-500`;
  $: labelFocusClass = `text-${focusColor}-600 dark:text-${focusColor}-500`;
  $: successClass = `border-${successColor}-500 focus:border-${successColor}-500 dark:border-${successColor}-500 dark:focus:border-${successColor}-500`;
  $: successTextClass = `text-${successColor}-600 dark:text-${successColor}-500`;
  $: labelSuccessClass = `text-${successColor}-500 dark:text-${successColor}-500`;
  $: errorClass = `border-${errorColor}-500 focus:border-${errorColor}-500 dark:border-${errorColor}-500 dark:focus:border-${errorColor}-500`;
  $: errorTextClass = `text-${errorColor}-500 dark:text-${errorColor}-500`;
  $: labelErrorClass = `text-${errorColor}-500 dark:text-${errorColor}-500`;
  $: focusTextClass = `text-${focusColor}-500 dark:text-${focusColor}-500`;
  $: baseLabelColor = 'text-gray-500 dark:text-gray-400';

  $: inputClasses = `
    peer block w-full rounded-lg px-2.5 py-3 h-12 text-sm text-gray-900
    ${bgColor} border appearance-none dark:text-white focus:outline-none focus:ring-0
    ${disabled ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}
    ${finalError ? errorClass :
      isFocused ? focusClass :
      isValid && touched ? successClass :
      'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500'}
  `;

  $: labelClasses = `
    absolute text-sm duration-200 transform scale-75 origin-[0] z-10 bg-white dark:bg-gray-700 px-1
    left-2.5 -top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-placeholder-shown:left-2.5
    peer-focus:scale-75 peer-focus:-top-2 ${baseLabelColor}
    ${finalError ? labelErrorClass : ''}
    ${isValid && touched ? labelSuccessClass : ''}
    ${isFocused ? labelFocusClass : ''}
  `;
</script>

{#if labelStyle === 'inline'}
  <div class="flex items-center gap-4">
    <label for={id} class="text-sm font-medium whitespace-nowrap">{label}<span style="color:red">{required ? ' *' : ''}</span></label>
    <input
      type={type}
      name={id}
      id={id}
      class={inputClasses + ' ' + ($$props.class || '')}
      placeholder={placeholder || ''}
      bind:value
      {disabled}
      autocomplete={autoCompleteValue}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={handleInput}
    />
    {#if finalError}
      <p class={"text-xs mt-0 ml-0 " + errorTextClass}>{finalError}</p>
    {:else if isFocused && focusMessage}
      <p class={"text-xs mt-0 ml-0 " + focusTextClass}>{focusMessage}</p>
    {:else if isValid && touched && successMessage}
      <p class={"text-xs mt-0 ml-0 " + successTextClass}>{successMessage}</p>
    {/if}
  </div>
{:else if labelStyle === 'stacked'}
  <div class="w-full">
    <label for={id} class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}<span style="color:red">{required ? ' *' : ''}</span></label>
    <input
      type={type}
      name={id}
      id={id}
      class={inputClasses + ' ' + ($$props.class || '')}
      placeholder={placeholder || ''}
      bind:value
      {disabled}
      autocomplete={autoCompleteValue}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={handleInput}
    />
    {#if finalError}
      <p class={"text-xs mt-0 ml-0 " + errorTextClass}>{finalError}</p>
    {:else if isFocused && focusMessage}
      <p class={"text-xs mt-0 ml-0 " + focusTextClass}>{focusMessage}</p>
    {:else if isValid && touched && successMessage}
      <p class={"text-xs mt-0 ml-0 " + successTextClass}>{successMessage}</p>
    {/if}
  </div>
{:else}
  <div class="relative w-full group">
    <input
      type={type}
      name={id}
      id={id}
      class={inputClasses + ' ' + ($$props.class || '')}
      placeholder={placeholder || ' '}
      bind:value
      {disabled}
      autocomplete={autoCompleteValue}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input={handleInput}
    />
    <label for={id} class={labelClasses}>{label}<span style="color:red">{required ? ' *' : ''}</span></label>
    {#if finalError}
      <p class={"text-xs mt-0 ml-0 " + errorTextClass}>{finalError}</p>
    {:else if isFocused && focusMessage}
      <p class={"text-xs mt-0 ml-0 " + focusTextClass}>{focusMessage}</p>
    {:else if isValid && touched && successMessage}
      <p class={"text-xs mt-0 ml-0 " + successTextClass}>{successMessage}</p>
    {/if}
  </div>
{/if}