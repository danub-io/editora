# Flowrift Color & Style Reference

We use this Flowrift template as our primary styling reference. Colors are implemented using standard Tailwind utility classes directly in the components.

## Reference Code Template

```html
<!-- hero - start -->
<div class="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <header class="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
      <!-- logo - start -->
      <a href="/" class="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
        <svg width="95" height="94" viewBox="0 0 95 94" class="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>

        Flowrift
      </a>
      <!-- logo - end -->

      <!-- nav - start -->
      <nav class="hidden gap-12 lg:flex">
        <a href="#" class="text-lg font-semibold text-indigo-500">Home</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Features</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">Pricing</a>
        <a href="#" class="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
      </nav>
      <!-- nav - end -->

      {/* ... other sections ... */}
    </header>
  </div>
</div>
```
