<template>
  <div class="grid grid-cols-12 gap-5 mt-5 pt-5 border-t">
    <a
      v-for="(faker, fakerKey) in $_.take($f(), 8)"
      :key="fakerKey"
      href="javascript:;"
      @click="addItemModal = true"
      class="intro-y block col-span-12 sm:col-span-4 2xl:col-span-3"
    >
      <div class="box rounded-md p-3 relative zoom-in">
        <div
          class="
            flex-none
            relative
            block
            before:block before:w-full before:pt-[100%]
          "
        >
          <div class="absolute top-0 left-0 w-full h-full image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-md"
              :src="faker.foods[0].image"
            />
          </div>
        </div>
        <div class="block font-medium text-center truncate mt-3">
          {{ faker.foods[0].name }}
        </div>
      </div>
    </a>
  </div>
</template>