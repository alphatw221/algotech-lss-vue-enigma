<template>
    <div class="box m-5 p-10">
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Country: </div>
            <div> Taiwan</div>
        </div>
        <div class="flex my-3 text-m">
            <div> Currency Symbol: </div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="currencySelect" :options="{
                        placeholder: 'Choose Currency Symbol',
                        }" class="w-full">
                <option value="1">Leonardo DiCaprio</option>
                <option value="2">Johnny Deep</option>
                <option value="3">Robert Downey, Jr</option>
                <option value="4">Samuel L. Jackson</option>
                <option value="5">Morgan Freeman</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Seller</div>
        </div> 
        <div class="flex my-3">
            <TomSelect v-model="sellerLang" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-full">
                <option value="english">English</option>
                <option value="filipino">Filipino</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="mandarin">Mandarin</option>
                <option value="tamil">Tamil</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Buyer</div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="buyerLang" :options="{
                        placeholder: 'Choose Language',
                        }" class="w-full">
                <option value="english">English</option>
                <option value="filipino">Filipino</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="mandarin">Mandarin</option>
                <option value="tamil">Tamil</option>
            </TomSelect>
        </div>
        <div class="flex my-3 text-lg">
            <div class="mr-5"> Decimal Places</div>
        </div>
        <div class="flex my-3">
            <TomSelect v-model="decimalSelect" :options="{
                        placeholder: 'Select your Decimal Places',
                        }" class="w-full">
                <option value="1">1</option>
                <option value="2">.01</option>
                <option value="3">100</option>
                <option value="4">1000</option>
            </TomSelect>
        </div>
        <div class="flex justify-end"> 
            <button class="btn btn-rounded-secondary mr-5"> Cancel</button>
            <button class="btn btn-rounded-primary"> Save</button>
        </div>
    </div>

</template>