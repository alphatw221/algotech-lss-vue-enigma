<template>
  <div :class="{ hidden: shoppingCartStore.openTab !== 2, block: shoppingCartStore.openTab === 2 }">
    <div class="grid grid-cols-12 lg:gap-10 w-full">
      <div class="col-span-12 row-start-2 lg:row-start-1 lg:col-span-8 mt-10 lg:mt-0">
        <TabGroup class="flex flex-col gap-10 text-left">
          <h2 id="shipping_info">{{$t('shopping_cart.delivery_tab.shipping_info')}}</h2>
          
          <TabList 
            v-if="shoppingCartStore.cart.campaign" 
            class="flex flex-row items-center justify-start w-full nav-boxed-tabs grow gap-2 -mt-4 sm:mt-0">
            <div class="w-1/2"
              v-if="shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled || shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled"> 
              <Tab class="h-14 border-[#131c34] w-48 xl:w-64 flex" tag="button" @click="select_shipping_method('delivery','tab')">
                <div class="inline-flex items-center w-full h-full place-content-center">
                  <SimpleIcon icon="delivery" :color="deliveryColor" class="block mr-3" width="24" /> 
                  <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.home_delivery')}}</span>
                </div>
              </Tab>
            </div>
            <div class="w-1/2"
              v-if="shoppingCartStore.cart.campaign.meta_logistic?.is_store_pickup_enabled">
              <Tab  
                class="h-14 border-[#131c34] w-48 xl:w-64 flex" tag="button"
                @click="select_shipping_method('pickup','tab')">
                <div class="inline-flex items-center w-full h-full place-content-center">
                  <SimpleIcon icon="store" :color="pickupColor" class="block mr-3" width="24" /> 
                  <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.self_pickup')}}</span>
                </div>
              </Tab>
            </div>
            <div class="text-danger mx-auto text-[18px]"
              v-if="!shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled 
              && !shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled 
              && !shoppingCartStore.cart.campaign.meta_logistic?.is_store_pickup_enabled"> 
              {{ $t('shopping_cart.delivery_tab.delivery_method_err') }}</div>
          </TabList>
         

          <TabPanels v-if="shoppingCartStore.cart.campaign" >
            <!-- BEGIN Delivery Panel -->
            <TabPanel 
            v-if="shoppingCartStore.cart.campaign.meta_logistic.is_self_delivery_enabled || shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled"
            class="leading-relaxed">
              <div class="flex flex-col gap-6">
                <!-- BEGIN Delivery Option -->
                <h3 id="delivery_options">{{$t('shopping_cart.delivery_tab.option.delivery')}}</h3>

                <div class="flex flex-col gap-4 mx-0 intro-y lg:mx-10 xl:mx-20">

                  <!-- Ecpay 店到店 -->
                  <template v-if="(shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled == true)">
                    <div class="flex flex-col gap-4">
                      <template v-for="(item, key, index) in shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.logistics_sub_type" :key="index">
                        <div v-if="item?.enabled == true" class="logistic-options border-2 rounded-lg relative"
                          :class="{'border-red-600/90 shadow-sm': shipping_option_index_computed == key}"
                          @click="select_shipping_method('ecpay')& (shipping_option_index_computed = key)"
                        >
                          <CheckSquareIcon v-if="shipping_option_index_computed == key" class="absolute left-3 text-red-800"/>
                          <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 flex-wrap"> 
                            <div class="flex flex-row gap-6 items-center">
                              <p :id="key" class="min-w-28 whitespace-nowrap">{{ $t(`settings.delivery_form.ecpay.logistics_sub_type.${key}`) }}</p>
                              <a v-if="key !== 'TCAT'" @click="get_c2c_map(key, 'ecpay', key)"><h4>{{$t('shopping_cart.delivery_tab.select_store')}}</h4></a>
                            </div>

                            <h4 id="cvs_info" class="-my-1" v-if="shoppingCartStore.cart.meta?.ecpay_cvs?.logistics_sub_type == key">
                              {{shoppingCartStore.cart.meta?.ecpay_cvs?.cvs_store_name}}<br/>
                              {{shoppingCartStore.cart.meta?.ecpay_cvs?.cvs_address}}
                            </h4>
                          </div>
                          <h4 id="option_price" class="whitespace-nowrap ml-auto">
                            <!-- on top delivery charge-->
                            <template v-if="computedAppliedCategoryLogistic"> 
                            </template>
                            <template v-else-if="item.type === '+'">
                                {{ shoppingCartStore.cart.campaign.currency }}
                                {{(Math.floor((parseFloat(item.delivery_charge) + parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge)) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
                                {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
                            </template>
                            <!-- replace delivery charge-->
                            <template v-else>
                                {{ shoppingCartStore.cart.campaign.currency }}
                                {{(Math.floor(parseFloat(item.delivery_charge) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
                                {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
                            </template>
                          </h4>
                        </div>
                      </template>
                    </div> 
                  </template>

                  <!-- Default Option -->
                  <div 
                      v-if="(shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled == true) || computedAppliedCategoryLogistic"
                      class="logistic-options border-2 rounded-lg relative"
                      :class="{'border-red-600/90 shadow-sm': shipping_option_index_computed == null}"
                      @click="select_shipping_method('delivery') & (shipping_option_index_computed = null)"
                    >
                    <CheckSquareIcon v-if="shipping_option_index_computed == null" class="absolute left-3 text-red-800"/>
                    <p id="default_delivery" class="min-w-[100px] whitespace-nowrap">{{ !['',' ',undefined,null].includes(shoppingCartStore.cart.campaign.meta_logistic?.title) ? shoppingCartStore.cart.campaign.meta_logistic?.title : $t('shopping_cart.delivery_tab.option.default')}}</p>
                    <template v-if="computedAppliedCategoryLogistic"></template>
                    <h4 v-else class="ml-auto">
                      {{ shoppingCartStore.cart.campaign.currency }}
                      {{(Math.floor(parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
                      {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
                    </h4>
                  </div>

                  <!-- Own Delivery Options -->
                  <template v-if="(shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled == true)"> 
                    <template
                      v-for="(option, index) in shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options"
                      :key="index"> 
                      <div class="logistic-options border-2 rounded-lg relative"
                        :class="{'border-red-600/90 shadow-sm': shipping_option_index_computed == index}"
                        @click="select_shipping_method('delivery') & (shipping_option_index_computed = index)"
                        >
                        <CheckSquareIcon v-if="shipping_option_index_computed == index" class="absolute left-3 text-red-800"/>

                        <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 flex-wrap"> 
                          <div class="flex flex-row gap-6 items-center">
                            <p :id="option.title" class="min-w-[100px] whitespace-nowrap">{{ option.title }}</p>
                            <a  v-if="(option.is_cvs == true) && (option?.cvs_key)" 
                                @click="get_c2c_map(option?.cvs_key, 'delivery', index)" >
                                <h4>{{$t('shopping_cart.delivery_tab.select_store')}}</h4></a>
                          </div>
                          <template v-if="shoppingCartStore.cart.meta?.ecpay_cvs?.logistics_sub_type && shoppingCartStore.cart.meta?.ecpay_cvs?.logistics_sub_type == option.cvs_key">
                            <h4 id="own_cvs_info" class="-my-1" >
                              {{shoppingCartStore.cart.meta.ecpay_cvs.cvs_store_name}} <br/>
                              {{shoppingCartStore.cart.meta.ecpay_cvs.cvs_address}}
                            </h4>
                          </template>
                        </div>

                        <h4 id="option_price" class="whitespace-nowrap ml-auto">
                          <!-- on top delivery charge-->
                          <template v-if="computedAppliedCategoryLogistic"></template>
                          <template v-else-if="option.type === '+'">
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{(Math.floor((parseFloat(option.price) + parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge)) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
                            {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
                          </template>
                          <!-- replace delivery charge-->
                          <template v-else>
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{(Math.floor(parseFloat(option.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toFixed(shoppingCartStore.cart.campaign.decimal_places)}}
                            {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}
                          </template>
                        </h4>
                      </div>
                    </template>
                  </template>

                  <!-- Delivery Date -->
                  <template v-if="shoppingCartStore.cart.campaign.meta_logistic.is_use_delivery_date_enabled && shoppingCartStore.cart.campaign.meta_logistic.delivery_date?.options && shipping_method_computed === 'delivery' && !shipping_info.shipping_option_data?.is_cvs">
                    <h3 class="whitespace-nowrap lg:-mx-10 xl:-mx-20">{{$t('shopping_cart.delivery_tab.delivery_date')}}</h3>
                    <div class="flex flex-col sm:flex-row gap-3"> 
                      <v-date-picker class="z-49" 
                        v-model="shipping_info.shipping_date_time"
                        mode="date" is-required
                        :min-date='shoppingCartStore.cart.campaign.meta_logistic.delivery_date.start_at'
                        :max-date='shoppingCartStore.cart.campaign.meta_logistic.delivery_date.end_at'
                        v-show="false"
                        >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input :value="inputValue" type="text" v-on="inputEvents"
                            class="border-2 h-[50px] px-10 w-full min-w-[300px] rounded-lg" />
                        </template>
                      </v-date-picker>
                      <Litepicker v-model="shipping_info.shipping_date" :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                        minDate:shoppingCartStore?.cart?.campaign?.meta_logistic?.delivery_date?.daterange?.split('~')?.[0],
                        maxDate:shoppingCartStore?.cart?.campaign?.meta_logistic?.delivery_date?.daterange?.split('~')?.[1],
                      }" class="block border-2 h-[50px] px-10 w-full min-w-[300px] rounded-lg" />


                      <div class="flex flex-col w-full"> 
                        <select 
                          class="border-2 h-[50px] w-full rounded-lg px-10 text-[1rem]" 
                          :class="{'border-danger': time_validate.shipping_time_slot.$errors.length > 0}" 
                          v-model="time_validate.shipping_time_slot.$model"> 
                          <option v-for="option in shoppingCartStore.cart.campaign.meta_logistic.delivery_date?.options" :key="option"> {{ option }} </option>
                        </select>
                        <h4 class="text-danger flex flex-col sm:flex-row"> 
                          <template v-for="(error,index) in time_validate.shipping_time_slot.$errors" :key="index">
                            <span>{{ error.$message }}</span>
                            <span v-if="index+1 !== time_validate.shipping_time_slot.$errors.length"
                                class="hidden sm:block mx-1">/</span>
                          </template>
                        </h4>
                      </div>
                    </div>
                  </template>
                </div>
                <!-- END Delivery Option -->

                <!-- Delivery Address -->
                <template v-if="showAddressForm">
                  <h2 class="mt-4 sm:mt-8">{{$t('shopping_cart.delivery_tab.delivery_info')}}</h2>
                  <div class="flex flex-col gap-4 intro-y">
                    <!--Street Address-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('shopping_cart.delivery_tab.address')}}</p>
                      <input id="regular-form-2" type="text" class="form-control"
                        :class="{ 'border-danger': delivery_validate.shipping_address_1.$error }"
                        :placeholder="$t('shopping_cart.delivery_tab.address_hint')"
                        v-model.trim="delivery_validate.shipping_address_1.$model" />
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_address_1.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_address_1.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    <!--City-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('shopping_cart.delivery_tab.city')}}</p>
                      <template v-if="shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled">
                        <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="city_computed"
                          :class="{ 'border-danger text-danger': delivery_validate.shipping_region.$errors.length }">
                          <option :value="null">{{ $t('shopping_cart.delivery_tab.please_select') }}</option>
                          <option v-for="(city,index) in twZipcodeStore.data" :key="index" :value="index">{{ city.name }}</option>
                        </select>
                      </template>
                      <template v-else> 
                        <input id="regular-form-2" type="text" class="form-control " placeholder=""
                          :class="{ 'border-danger text-danger': delivery_validate.shipping_region.$error }"
                          v-model.trim="delivery_validate.shipping_region.$model" /> 
                      </template>

                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_region.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_region.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    <!--District Area-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('shopping_cart.delivery_tab.district')}}</p>
                      <template v-if="shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled">
                        <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="area_computed"
                          :class="{ 'border-danger text-danger': delivery_validate.shipping_location.$errors.length }">
                          <option :value="null">{{ $t('shopping_cart.delivery_tab.please_select') }}</option>
                          <option v-for="(area,index) in twZipcodeStore.data[cityIndex]?.areas" :key="index" :value="index">{{ area.name }}</option>
                        </select>
                      </template>
                      <template v-else> 
                        <input id="regular-form-2" type="text" class="form-control " placeholder=""
                          :class="{ 'border-danger text-danger': delivery_validate.shipping_location.$error }"
                          v-model.trim="delivery_validate.shipping_location.$model" /> 
                      </template>

                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_location.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_location.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    <!--Street Address-->
                    <div class="flex flex-col gap-1" v-if="shoppingCartStore.user_subscription?.user_plan?.display?.order_shipping_property_type">
                      <p>{{$t('shopping_cart.delivery_tab.property')}}</p>

                      <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="shipping_info.shipping_property_type">
                          <option :value="null"></option>
                          <option value="HDB">HDB</option>
                          <option value="Condo/Apartment">Condo/Apartment</option>
                          <option value="Landed">Landed</option>
                          <option value="Office">Office</option>

                        </select>

                      <!-- <input id="regular-form-2" type="text" class="form-control"
                        :placeholder="$t('shopping_cart.delivery_tab.property_hint')"
                        v-model.trim="shipping_info.shipping_property_type" /> -->
                    </div>

                    <!--Postal Code-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('shopping_cart.delivery_tab.postal_code')}}</p>
                      <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger text-danger': delivery_validate.shipping_postcode.$error }"
                        v-model.trim="delivery_validate.shipping_postcode.$model" />
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_postcode.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_postcode.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>
                  </div>
                </template> 
              </div>
            </TabPanel>
            <!-- END Delivery Panel -->

            <!-- BEGIN Pickup Panel -->
            <TabPanel v-if="shoppingCartStore.cart.campaign.meta_logistic?.is_store_pickup_enabled" 
              class="leading-relaxed">
              <div class="flex flex-col gap-6">
                <h3 id="pickup_options">{{$t('shopping_cart.delivery_tab.option.pickup')}}</h3>

                <!-- pickup options-->
                <div class="flex flex-col gap-4 lg:mx-20 z-0"> 
                  <template v-for="(option, index) in shoppingCartStore.cart.campaign.meta_logistic.pickup_options" :key="index"> 
                    <div class="logistic-options border-2 rounded-lg relative"
                      :class="{'border-red-600/90 shadow-sm': shipping_option_index_computed == index}"
                      @click="select_shipping_method('pickup'); (shipping_option_index_computed = index);"
                      >
                      <CheckSquareIcon v-if="shipping_option_index_computed == index" class="absolute left-3 text-red-800"/>
                      <div class="flex flex-col sm:flex-row flex-0 w-full"> 
                        <div class="flex flex-col mr-auto">
                          <p>{{ option.name }}</p>
                          <h4>{{ option.address }}</h4>
                        </div> 
                        <template v-if="option.start_at !== null && option.end_at !== null"> 
                          <h4 class="flex-0 my-auto text-slate-600">
                            {{new Date(option.start_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                            +'~'+
                            new Date(option.end_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}}</h4>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- pickup time-->
                <template v-if="shoppingCartStore.cart.campaign.meta_logistic?.pickup_options[shipping_option_index]?.start_at && shipping_method_computed == 'pickup'"> 
                  <h3 class="whitespace-nowrap">{{$t('shopping_cart.delivery_tab.pickup_date')}}</h3>
                  <div class="flex flex-col sm:flex-row gap-3 lg:mx-20 z-20">
                    <v-date-picker class="z-50" 
                      v-model="time_validate.shipping_date_time.$model"
                      mode="date" is-required
                      :min-date='date_range.start'
                      :max-date='date_range.end'
                      >
                      <template v-slot="{ inputValue, inputEvents }">
                        <input :value="inputValue" v-on="inputEvents" 
                          :class="{'border-danger': time_validate.shipping_date_time.$errors.length > 0}"
                          class="border-2 h-[50px] px-10 w-full min-w-[300px] rounded-lg" />
                        <h4 class="text-danger flex flex-col sm:flex-row"> 
                          <template v-for="(error,index) in time_validate.shipping_date_time.$errors" :key="index">
                            <span>{{ error.$message }}</span>
                            <span v-if="index+1 !== time_validate.shipping_date_time.$errors.length"
                                class="hidden sm:block mx-1">/</span>
                          </template>
                        </h4>
                      </template>
                    </v-date-picker>
                    <div class="flex flex-col w-full">
                      <select 
                        class="border-2 h-[50px] w-full rounded-lg px-10 text-[1rem]" 
                        :class="{'border-danger': time_validate.shipping_time_slot.$errors.length > 0}"
                        v-model="time_validate.shipping_time_slot.$model"> 
                        <option v-for="option in shoppingCartStore.cart.campaign.meta_logistic.pickup_options[shipping_option_index]?.options" :key="option"> {{ option }} </option>
                      </select>
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in time_validate.shipping_time_slot.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== time_validate.shipping_time_slot.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>
                  </div>
                </template>
              </div>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>
        </TabGroup>

        <div class="flex flex-col gap-10 sm:gap-14 mt-10 sm:mt-14">
          <div class="flex flex-col gap-4">
            <h3 class="w-full mr-auto text-xl font-medium mb-2">{{$t('shopping_cart.delivery_tab.contact_info')}}</h3>
            <div class="flex flex-col lg:flex-row justify-between gap-4 lg:gap-20"> 

              <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full">
                <p class="flex-2 mt-2 w-24">{{$t('shopping_cart.delivery_tab.full_name')}}</p>
                <div class="flex-1">
                  <input type="text" 
                    class="form-control" 
                    :placeholder="$t('shopping_cart.delivery_tab.name_placeholder')"
                    :class="{ 'border-danger': reciever_validate.shipping_first_name.$error }"
                    v-model.trim="reciever_validate.shipping_first_name.$model" 
                    @blur="reciever_validate.shipping_first_name.$touch"/>
                  <h4 class="text-danger flex flex-col sm:flex-row"> 
                    <template v-for="(error,index) in reciever_validate.shipping_first_name.$errors" :key="index">
                      <span>{{ error.$message }}</span>
                      <span v-if="index+1 !== reciever_validate.shipping_first_name.$errors.length"
                          class="hidden sm:block mx-1">/</span>
                    </template>
                  </h4>
                </div>
              </div>

              <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full">
                <p class="flex-2 mt-2 w-24">{{$t('shopping_cart.delivery_tab.email')}}</p>
                <div class="flex-1">
                  <input type="email" 
                    placeholder="example@gmail.com"
                    class="form-control"
                    :class="{ 'border-danger': reciever_validate.shipping_email.$error }"
                    v-model.trim="reciever_validate.shipping_email.$model" />
                  <h4 class="text-danger flex flex-col sm:flex-row"> 
                    <template v-for="(error,index) in reciever_validate.shipping_email.$errors" :key="index">
                      <span>{{ error.$message }}</span>
                      <span v-if="index+1 !== reciever_validate.shipping_email.$errors.length"
                          class="hidden sm:block mx-1">/</span>
                    </template>
                  </h4>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 lg:w-1/2 lg:pr-10"> 
              <p class="flex-2 mt-2 w-24 whitespace-nowrap">{{$t('shopping_cart.delivery_tab.cell_phone')}}</p>
              <div class="flex-1">
                <input type="tel" 
                  class="form-control " placeholder=""
                  :class="{ 'border-danger': reciever_validate.shipping_cellphone.$error }"
                  v-model.trim="reciever_validate.shipping_cellphone.$model" />
                <h4 class="text-danger flex flex-col sm:flex-row"> 
                  <template v-for="(error,index) in reciever_validate.shipping_cellphone.$errors" :key="index">
                    <span>{{ error.$message }}</span>
                    <span v-if="index+1 !== reciever_validate.shipping_cellphone.$errors.length"
                        class="hidden sm:block mx-1">/</span>
                  </template>
                </h4>
              </div>
            </div>

          </div>

          <template v-if="shoppingCartStore.cart?.campaign?.meta_logistic?.delivery_note">
            <div class="flex flex-col gap-6"> 
              <h3>{{$t('shopping_cart.delivery_tab.note')}}</h3>
              <p class="p-5 form-control whitespace-pre-line border" placeholder="">
                {{shoppingCartStore.cart.campaign.meta_logistic.delivery_note}} 
              </p>
            </div>
          </template>
          
          <div class="flex flex-col gap-6"
            v-if="!shoppingCartStore.user_subscription?.user_plan?.hide?.order_shipping_remark">
            <h3 class="font-medium text-md">{{$t('shopping_cart.delivery_tab.remark')}}</h3>
            <textarea id="" class="form-control indent-4 h-32" placeholder=""
              v-model="shipping_info.shipping_remark">
            </textarea>
          </div>
        </div>

      </div> 

      <div class="col-span-12 row-start-1 lg:col-span-4 flex flex-col gap-10">
        <div class="intro-y">
          <OrderSummarySkeleton v-if="props.cartLoading"/>
          <OrderSummary class="m-0 2xl:m-5" v-else />
        </div>

        <div class="intro-y box lg:col-span-4">
          <ShoppingCartTableSimple />
        </div>
      </div>
    </div>
    
    <div class="flex my-10">
      <button class="mr-auto rounded-full px-5 w-fit btn btn-outline-primary" @click="shoppingCartStore.openTab= 1">
        {{$t('shopping_cart.delivery_tab.previous')}}
      </button>
      <button 
        :show="show" class="w-fit btn btn-rounded-primary px-5"
        @click="proceed_to_payment()" :disabled="shoppingCartStore.user_subscription.status === sandboxMode || checkoutLoading">

        {{$t('shopping_cart.delivery_tab.proceed_to_payment')}}

      </button>
    </div>

    <Modal :show="checkoutLoading" @hidden="!checkoutLoading" class="text-center" backdrop="static">
        <ModalBody class="">
          <div class="flex flex-col"> 
            <p class="text-lg text-primary font-medium"> {{$t('shopping_cart.delivery_tab.processing')}} </p>
            <LoadingIcon icon="loading_payment"/>
          </div>
        </ModalBody>
    </Modal>
  </div>
</template>


<script setup>
import OrderSummary from "./OrderSummary.vue";
import OrderSummarySkeleton from "./skeleton/OrderSummarySkeleton.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";
import { required, minLength, maxLength, email, integer, helpers, requiredUnless } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { computed, onMounted,onUnmounted, ref, watch, reactive, toRefs, getCurrentInstance } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
import { buyer_checkout_cart,buyer_get_cvs_map } from "@/api_v2/cart"
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useTwZipcodeStore } from "@/stores/tw-zipcode"
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"
import TomSelect from "tom-select";

const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();
const twZipcodeStore = useTwZipcodeStore();
const sandboxMode = ref("test")
const show = ref(false)
const checkoutLoading = ref(false)

const date_range = ref({
  start:new Date(),
  end:new Date()
})

const props = defineProps({
    cartLoading: {
        type: Boolean,
        default: true,
  },
})
const shipping_option_index = ref("No")
const shipping_info= ref({
			shipping_option:"",
      shipping_method: "delivery",
      shipping_first_name: (layoutStore?.userInfo?.facebook_info?.name||""),
      shipping_email: "",
      shipping_cellphone: "",
      shipping_gender: "",
      shipping_company: "",
      shipping_postcode: "",
      shipping_region: "",
      shipping_location: "",
      shipping_property_type:"",
      shipping_address_1: "",
      shipping_address_2: "",
      shipping_status: "",
      shipping_details: "",
      shipping_remark: "",
      shipping_date: "",
      shipping_date_time:null,
      shipping_time_slot: null,
      pickup_address:"",
      shipping_option_data:{}
		})


const deliveryColor = ref('white')
const pickupColor = ref('#131C34')
const showAddressForm = ref(true)

const select_shipping_method = (method,type) => {
  deliveryColor.value = method !== 'pickup'? 'white' :'#131C34'
  pickupColor.value = method == 'pickup'? 'white' :'#131C34'
  if(type == 'tab' && method == shipping_method_computed.value) return 
  if(type == 'tab' && method == 'delivery' && shipping_method_computed.value == 'ecpay') return 
  else if(method !== shipping_method_computed.value) {
    shipping_method_computed.value = method
    shipping_info.value.shipping_time_slot = null
  }
}

const get_c2c_map = (storeType, shipping_method, shipping_option_index) =>{
  const cvsdata = {'LogisticsSubType':storeType, 'shipping_method': shipping_method, 'shipping_option_index': shipping_option_index} //UNIMARTC2C or FAMIC2C
  buyer_get_cvs_map(route.params.cart_oid,cvsdata).then(
    res=>{
      const form = document.createElement('form');
      form.setAttribute("id", "data_set");
      form.method = 'post';
      form.action = res.data.action;
      const params = res.data.data
      // {
      //   "MerchantID": "3344643",
      //   "MerchantTradeNo": "anyno",
      //   "LogisticsType": "CVS",
      //   "LogisticsSubType": "UNIMARTC2C",
      //   "IsCollection": "Y",
      //   "ServerReplyURL": "https://3612-220-136-84-226.jp.ngrok.io/api/v2/cart/buyer/cvsmap/callback/",
      //   "ExtraData": "6390449bbc4b20ae3d99e212"
      // }
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const hiddenField = document.createElement('input');
          hiddenField.type = 'hidden';
          hiddenField.name = key;
          hiddenField.value = params[key];

          form.appendChild(hiddenField);
        }
      }
      document.body.appendChild(form);
      form.submit();
    }
  )
  
}

const areaIndex = ref(null)
const cityIndex = ref(null)
const city_computed = computed({
  get:()=>{
    return cityIndex.value
  },
  set:index=>{
    cityIndex.value = index
    if(twZipcodeStore.data[index]?.name) delivery_validate.value.shipping_region.$model = twZipcodeStore.data[index]?.name
    areaIndex.value = null
  }
})
const area_computed = computed({
  get:()=>{
    return areaIndex.value
  },
  set:index=>{
    areaIndex.value = index
    if(twZipcodeStore.data[cityIndex.value]?.areas[index]?.name) delivery_validate.value.shipping_location.$model= twZipcodeStore.data[cityIndex.value]?.areas[index]?.name
    if(twZipcodeStore.data[cityIndex.value]?.areas[index]?.zip) delivery_validate.value.shipping_postcode.$model = twZipcodeStore.data[cityIndex.value]?.areas[index]?.zip
  }
})

const deliveryCurrentChosenOption = ref(null)

const shipping_method_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_method
  }
  ,set:method=>{
    deliveryColor.value = method !== 'pickup'? 'white' :'#131C34'
    pickupColor.value = method == 'pickup'? 'white' :'#131C34'
    shipping_info.value.shipping_method=method
    shoppingCartStore.shipping_info.shipping_method=method        //order summary compute this
    if (method == 'delivery') {
      shoppingCartStore.shipping_info.shipping_option_index = deliveryCurrentChosenOption.value
      shipping_option_index_computed.value = deliveryCurrentChosenOption.value
    } 
    if (method === "pickup") {
      if (shoppingCartStore.cart.campaign.meta_logistic?.pickup_options.length > 0) {
        deliveryCurrentChosenOption.value = shipping_option_index.value != "No" ? shipping_option_index.value : null
        shoppingCartStore.shipping_info.shipping_option_index = 0
        shipping_option_index_computed.value = 0
        date_range.value.start = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[shipping_option_index_computed.value].start_at
        date_range.value.end = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[shipping_option_index_computed.value].end_at
      } else {
        shoppingCartStore.shipping_info.shipping_option_index = null
      }
      
    }
  }
})

const shipping_option_index_computed = computed({
  get:()=>{
    return shipping_option_index.value
  },set:index=>{
    // console.log("set", index)
    // console.log(shipping_info.value.shipping_method)
    if(shipping_info.value.shipping_method=='pickup' && shipping_option_index.value !== index) shipping_info.value.shipping_time_slot = null
    shipping_option_index.value = index
    shoppingCartStore.shipping_info.shipping_option_index=index 
    // pickup 
    if (shipping_info.value.shipping_method=='pickup') {
      shipping_info.value.pickup_address = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.address
      shipping_info.value.shipping_option = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.name

      date_range.value.start = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].start_at
      date_range.value.end = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].end_at

      shipping_info.value.shipping_option_data = JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]))
      showAddressForm.value = false
    
    // delivery
    } else if (shipping_info.value.shipping_method=='delivery' && typeof index !== 'string') {
      shipping_info.value.shipping_option = index != null ? shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]?.title : shoppingCartStore.cart.campaign.meta_logistic?.title
      shipping_info.value.shipping_option_data = index == null ? {} : JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]))
      if(shipping_option_index.value == shoppingCartStore.cart.meta?.ecpay_cvs?.shipping_option_index) {
        Object.assign(shipping_info.value.shipping_option_data,shoppingCartStore.cart.meta?.ecpay_cvs)
      }
      if (shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]?.is_cvs) {
        showAddressForm.value = false
      } else {
        showAddressForm.value = true
      }
    
    // ecpay
    } else if (shipping_info.value.shipping_method=='ecpay') {
      if(shipping_option_index.value == shoppingCartStore.cart.meta?.ecpay_cvs?.shipping_option_index) {
        shipping_info.value.shipping_option_data = shoppingCartStore.cart.meta?.ecpay_cvs
      } else {
        shipping_info.value.shipping_option_data = {}
      }
      Object.assign(shipping_info.value.shipping_option_data,{
        'LogisticsSubType': shipping_option_index.value,
        'type': shoppingCartStore.cart.campaign.meta_logistic[shipping_info.value.shipping_method]?.logistics_sub_type[shipping_option_index.value].type,
        "price": shoppingCartStore.cart.campaign.meta_logistic[shipping_info.value.shipping_method]?.logistics_sub_type[shipping_option_index.value].delivery_charge,
      })

      if (["TCAT"].includes(shipping_option_index.value)) {
        shipping_info.value.shipping_option_data['logisticsType'] = 'HOME'
        showAddressForm.value = true
      } else {
        shipping_info.value.shipping_option_data['logisticsType'] = 'CVS'
        showAddressForm.value = false
      }
    }
    // console.log(shipping_info.value.shipping_option_data)
  }
})

const isAnonymousUser=cookies.get("login_with")=='anonymousUser'


onMounted(()=>{
  eventBus.on("changeShippingOption", (payload)=>{
    shipping_method_computed.value = shoppingCartStore.shipping_info.shipping_method
    shipping_option_index_computed.value = shoppingCartStore.shipping_info.shipping_option_index
  })
  if(!isAnonymousUser){

    buyer_retrieve_latest_order_shipping_info(layoutStore.alert).then(res=>{
      res.data.shipping_method='delivery'     //default value
      res.data.shipping_option_data={}        //default value
      console.log(res.data)
      shipping_info.value = {...shipping_info.value, ...res.data, shipping_date:"", shipping_time_slot:null}
      city_computed.value = (twZipcodeStore.data.findIndex(city => city.name == shipping_info.value.shipping_region) == -1) ? res.data.shipping_region : twZipcodeStore.data.findIndex(city => city.name == shipping_info.value.shipping_region)
      areaIndex.value = (twZipcodeStore.data[city_computed.value]?.areas) ? twZipcodeStore.data[city_computed.value]?.areas.findIndex(area => area.name == shipping_info.value.shipping_location) : res.data.shipping_location
      show.value = true
    })
  }
})

onUnmounted(()=>{
  eventBus.off('changeShippingOption')
})

// VALIDATER
const exactlength = (param) =>
  helpers.withParams(
    { type: 'exactlength', value: param },
    (value) => {
      var ecpay_enabled = shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled ? true : false
      if (value.length !== param && ecpay_enabled) return false
      return true
    }
)
const twCellPhoneBeginning = (value) => {
  var ecpay_enabled = shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled ? true : false
  if (value[0] !== "0" && ecpay_enabled) return false
  if (value[1] !== "9" && ecpay_enabled) return false
  return true
}
const specialCharacter = (value) => {
  const special_characters = "^‘`!@#%&*+”<>|_[]"
  return !special_characters.split('').some(char => value.includes(char))
}
const bytesBtwLength = (min,num) => (value) => {
  var string; 
  var len = 0;
  for(var i=0; i < value.length; i++){
    string = value.charCodeAt(i);
   while( string > 0 && string != 32){
      len++;
      string = string >> 8;
   }
  }
  if (len > num) return false
  if (min > len) return false
  else return true
}



const reciever_rules = computed(()=>{
  return{
    shipping_first_name: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:50 }), maxLength(50)),
      minLength: helpers.withMessage(i18n.global.t("vulidate.below_minimum_length", { number:2 }), minLength(2)),
      // bytesBtwLength: helpers.withMessage(i18n.global.t("vulidate.name_between_length", { number:'4-50' }), bytesBtwLength(4,50)),
      specialCharacter: helpers.withMessage(i18n.global.t("vulidate.contains_special_characters") + " ^ ‘ ` ! @ # % & * + ” < > | _ [ ]", specialCharacter)
    },
    shipping_cellphone: {
      integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      cellphoneLength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:10}), exactlength(10)),
      twCellPhoneBeginning: helpers.withMessage(i18n.global.t("vulidate.tw_cellphone_begining"), twCellPhoneBeginning)
    },
    shipping_email: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      email: helpers.withMessage(i18n.global.t("vulidate.invalid_email"), email),
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:100 }), maxLength(100)),
    }
  }
});
const delivery_rules = computed(()=>{
  return{
    shipping_address_1: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      bytesBtwLength: helpers.withMessage(i18n.global.t("vulidate.invalid_address"), bytesBtwLength(4,60)),
    },
    shipping_location: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      // exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_region: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      // exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_postcode: {
      integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:6 }), maxLength(6)),
    },
  }}
);
const time_rules = computed(()=>{
  return{
    shipping_date:{required}, 
    shipping_time_slot:{required}
  }}
);
const reciever_validate = useVuelidate(reciever_rules, shipping_info);
const delivery_validate = useVuelidate(delivery_rules, shipping_info);
const time_validate = useVuelidate(time_rules, shipping_info);

const computedLogisticCategories = computed(()=>{
  let logisticCategories = {}
  Object.entries(shoppingCartStore.cart.products).forEach(([key, value])=>{
    if(value>0 && shoppingCartStore.campaignProductDict?.[key]?.categories?.length===1 && shoppingCartStore.campaignProductDict?.[key]?.categories[0] in shoppingCartStore.productCategoryDict){
      
      if(logisticCategories?.[shoppingCartStore.campaignProductDict?.[key]?.categories[0]]){
        logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]].push({campaignProductId:key,qty:value})
      }else{
        logisticCategories[shoppingCartStore.campaignProductDict?.[key]?.categories[0]] = [{campaignProductId:key,qty:value},]
      }
    }
  })
  return logisticCategories
})

const computedAppliedCategoryLogistic = computed(()=>{
  var applied = false
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = shoppingCartStore.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate) applied = true
  })
  return applied
})

const proceed_to_payment = () =>{
  // console.log(shipping_info.value)

  //CHECK SHIPPING OPTIONS
  if(shipping_info.value.shipping_method !== 'pickup' && shipping_option_index_computed.value === 'No'){
    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_delivery_method'))
    return
  }

  if (shipping_info.value.shipping_method === 'pickup' && shipping_option_index.value === 'No'){
    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_pickup_method'))
    return
  }

  if((shipping_info.value.shipping_option_data['logisticsType'] == 'CVS' || shipping_info.value.shipping_option_data['is_cvs']) && !shipping_info.value.shipping_option_data['cvs_store_id']){
    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_cvs_store'))
    return
  }

  // CHECK DELIVERY ADDRESS INFO
  // pickup, ecpay cvs, self delivery cvs. These options doesn't need validate delivery address
  if ((["UNIMARTC2C", "FAMIC2C"].includes(shipping_option_index.value)) 
  || (shipping_info.value.shipping_method === 'delivery' && shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[shipping_option_index.value]?.is_cvs == true) 
  || (shipping_info.value.shipping_method === 'pickup')) {
    shipping_info.value.shipping_location = ''
    shipping_info.value.shipping_region = ''
    shipping_info.value.shipping_address_1 = ''
    shipping_info.value.shipping_postcode = ''
    shipping_info.value.shipping_property_type = ''

  } else {
    delivery_validate.value.$touch();
    if (delivery_validate.value.$invalid && shipping_info.value.shipping_option_data.logisticsType !== 'CVS'){
      layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_delivery_info'))
      return
    }
  }


  //CHECK DELIVERY TIME INFO
  if( (shipping_info.value.shipping_method === 'ecpay') 
    || (shipping_info.value.shipping_method === 'delivery' && !shoppingCartStore.cart.campaign.meta_logistic.delivery_date.start_at) 
    || ((shipping_info.value.shipping_method === 'pickup' && !shoppingCartStore.cart.campaign.meta_logistic.pickup_options[shipping_option_index.value]?.start_at)) ){
    shipping_info.value.shipping_date_time = null
    shipping_info.value.shipping_time_slot = null
  } else {
    time_validate.value.$touch();
    if (time_validate.value.$invalid){
      layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_time_info'))
      return
    }
  }

  //CHECK RECIEVER INFO
  reciever_validate.value.$touch();
  if (reciever_validate.value.$invalid) {
    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_user_info'))
    return
  }

  checkoutLoading.value = true
  buyer_checkout_cart(route.params.cart_oid, {shipping_data:shipping_info.value, points_used:shoppingCartStore.points_used}, layoutStore.alert)
  .then(res=>{
    if(res.data.oid){
      router.push({name:"buyer-order-payment-page", params:{'order_oid':res.data.oid}})
    }else{
      shoppingCartStore.cart = res.data
      layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.add_item.out_of_stock'))
    }
    checkoutLoading.value = false
  })
  .catch(err=>{checkoutLoading.value = false})
  
}


</script>

<style scoped>

/* 大標題 */
h2{
  font-size: 20px; 
  font-weight: 500; 
}
/* 副標 */
h3{
  font-size: 16px; 
  font-weight: 500; 
}

h4{
  font-size: 14px; 
}

p{
  font-size: 16px; 
}

.logistic-options{
  display: flex;
  flex-direction:row;
  align-items:center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 40px 20px 48px;
  min-height: 80px;
  cursor: pointer;
}

.homeTab {
  border-radius: 0px !important;
}

.nav-item{
  justify-content: center;
  display: flex !important;
}

input::placeholder {
  font: 10px/3 sans-serif;
}
</style>