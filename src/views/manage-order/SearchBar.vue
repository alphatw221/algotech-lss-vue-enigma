<template>
    <div class="relative w-full h-16">
                    <div class="flex w-full absolute mr-auto m-1 right-0 sm:mt-1 sm:w-auto ">
                        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-700 " />
                        <input type="text" class="form-control rounded-full mr-2 w-full sm:w-64 box px-10"
                            placeholder="Search files" />

                        <div class="export">
                             <Dropdown class="relative p-2 mr-1 flex rounded-full items-center btn border-[#131C34] "
                            placement="bottom-start"> Export
                            <DropdownToggle role="button" class="w-5 h-5 block" href="javascript:;">
                                <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                            </DropdownToggle>
                            <DropdownMenu class="pt-2">
                                <DropdownContent class="w-full text-center">
                                    <DropdownItem @click="onExportXlsx"> XLSM </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                       <div class="export">
                           <Dropdown class=" relative inset-y-0 p-2 flex rounded-full items-center btn border-[#131C34]"
                            placement="bottom-start">
                            <DropdownToggle role="button" class="w-5 h-5 mr-1 block" href="javascript:;">
                                <FilterIcon class="w-5 h-5 text-slate-700" />
                            </DropdownToggle>
                            Filter
                            <DropdownMenu class="pt-2">
                                <DropdownContent>
                                    <DropdownItem> Delivery </DropdownItem>
                                    <DropdownItem> Payment </DropdownItem>
                                    <DropdownItem> Platform </DropdownItem>
                                </DropdownContent>
                            </DropdownMenu>
                        </Dropdown>
                       </div>
                    </div>
                </div>
</template>