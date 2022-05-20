<template>
	<div>
		<div class="intro-y flex items-center mt-8">
			<h2 class="text-lg font-medium mr-auto">Add New Product</h2>
		</div>

		<div class="intro-y grid grid-cols-12 gap-4 box p-5 mt-5">

			<div class="col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Product Name</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
				/>
			</div>
			<div class="col-span-6">
				<label for="crud-form-2" class="form-label">Category</label>
				<TomSelect
					id="crud-form-2"
					v-model="categories"
					class="w-full"
					multiple
				>
					<option value="1">Sport & Outdoor</option>
					<option value="2">PC & Laptop</option>
					<option value="3">Smartphone & Tablet</option>
					<option value="4">Photography</option>
				</TomSelect>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label class="form-label">Upload Image</label>
				<div class="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
					<div class="flex flex-wrap px-4">
						<div
							v-for="(faker, fakerKey) in $_.take($f(), 4)"
							:key="fakerKey"
							class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in"
						>
							<img
								class="rounded-md"
								alt="Midone Tailwind HTML Admin Template"
								:src="faker.images[0]"
							/>
							<Tippy
								tag="div"
								content="Remove this image?"
								class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
							>
								<xIcon class="w-4 h-4" />
							</Tippy>
						</div>
					</div>
					<div class="px-4 pb-4 flex items-center cursor-pointer relative">
						<ImageIcon class="w-4 h-4 mr-2" />
						<span class="text-primary mr-1">Upload a file</span> or
						drag and drop
						<input
							type="file"
							class="w-full h-full top-0 left-0 absolute opacity-0"
						/>
					</div>
				</div>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label>Type</label>
				<div class="flex flex-col sm:flex-row mt-2">
						<div class="form-check mr-2">
								<input id="radio-switch-4" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-chris-evans" />
								<label class="form-check-label" for="radio-switch-4">Product</label>
						</div>
						<div class="form-check mr-2 mt-2 ml-2 sm:mt-0">
								<input id="radio-switch-5" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-liam-neeson" />
								<label class="form-check-label" for="radio-switch-5">Lucky Draw</label>
						</div>
				</div>
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Order Code</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Description</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
				/>
			</div>

			<div class="mt-3 col-span-6 col-start-1">
				<label for="crud-form-1" class="form-label">Quantity</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
				/>
			</div>
			<div class=" mt-3 col-span-6">
				<label for="crud-form-1" class="form-label">Price</label>
				<input
					id="crud-form-1"
					type="text"
					class="form-control w-full"
					placeholder="Input text"
				/>
			</div>

			<div class="mt-3 col-span-12 col-start-1">
				<label>Status</label>
				<div class="flex flex-col sm:flex-row mt-2">
						<div class="form-check mr-2">
								<input id="radio-switch-4" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-chris-evans" />
								<label class="form-check-label" for="radio-switch-4">For Sale</label>
						</div>
						<div class="form-check mr-2 mt-2 ml-2 sm:mt-0">
								<input id="radio-switch-5" class="form-check-input" type="radio" name="horizontal_radio_button" value="horizontal-radio-liam-neeson" />
								<label class="form-check-label" for="radio-switch-5">Delisted</label>
						</div>
				</div>
			</div>

			<div class="mt-3 col-span-12 ">
				<div class="flex mt-5 float-right">
					<button class="btn w-32 dark:border-darkmode-400 ">
						Cancel
					</button>
					<button class="btn btn-primary w-32 shadow-md ml-5">
						Save
					</button>
				</div>
			</div>

		</div>

	</div>
</template>
