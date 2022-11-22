<template>
<!-- games/view/delete/quiz/lucky_draw/shopping_cart/edit  -->
    <svg 
    v-if="icon == 'games'" width="30" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="9" width="16" height="10" rx="5" stroke="black" stroke-width="1.5"/>
        <path d="M12 5L12 9" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M8 14H10" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M9 13V15" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="16" cy="13" r="1" fill="black"/>
        <circle cx="14" cy="15" r="1" fill="black"/>
    </svg>
    <svg 
    v-else-if="icon == 'view'"
        width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12C10 6.66667 14 6.66667 19 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="13" r="3" stroke="black" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'viewOrder'"
    :stroke="props.color"
    width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 5H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 9H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5 9.5L14 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="10" cy="7" r="3" stroke-width="1.5"/>
    </svg>


    <svg
    v-else-if="icon == 'delete'"  
        width="24" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
        <path d="M3 3L3.84717 13.1661C3.93356 14.2027 4.80009 15 5.84027 15H10.1597C11.1999 15 12.0664 14.2027 12.1528 13.1661L13 3"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 3H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 1H10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.12134 6V10.2426" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.1213 6V10.2426" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


    <svg 
    v-else-if="icon == 'quiz'" 
        width="24" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
        <path d="M13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13" stroke-width="1.5"/>
        <circle cx="13" cy="13" r="6" stroke-width="1.5"/>
        <path d="M5 5L8.5 8.5" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M5 9L9 5" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M10.5 13L12.5 15L15.5 11.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


    <svg
    v-else-if="icon == 'lucky_draw'" 
        width="24" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0739 13.875C14.8364 13.875 14.6126 13.9806 14.4493 14.1531C13.0822 15.5984 11.1464 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 9.32046 16.4799 9.63622 16.4409 9.9461C16.381 10.4217 16.7307 10.875 17.21 10.875C17.5565 10.875 17.859 10.6329 17.9083 10.2899C17.9687 9.86862 18 9.43796 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C11.6381 18 14.011 16.865 15.6572 15.0566C16.0907 14.5804 15.7179 13.875 15.0739 13.875Z" :fill="props.color"/>
        <path d="M9 9H10.4381C10.9422 9 11.4276 9.19032 11.7974 9.53288L14.4248 11.9671C14.7946 12.3097 15.28 12.5 15.7841 12.5H18.5" :stroke="props.color" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M6 17L5 19" :stroke="props.color" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M12 17L13 19" :stroke="props.color" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="9.5" cy="15.5" r="1.5" :stroke="props.color" stroke-width="1.5"/>
        <circle cx="5.5" cy="14.5" r="1.5" :stroke="props.color" stroke-width="1.5"/>
        <circle cx="5.5" cy="7.5" r="1.5" :stroke="props.color" stroke-width="1.5"/>
        <path d="M3 19.5H14.822" :stroke="props.color" stroke-width="1.5" stroke-linecap="round"/>
        </svg>

    <svg 
    v-else-if="icon == 'shopping_cart'"
    width="22" height="20" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H2.59915C3.44016 1 4.19132 1.52614 4.47873 2.31651L7.52127 10.6835C7.80868 11.4739 8.55984 12 9.40085 12H14.2654C15.2607 12 16.1046 
    11.2681 16.2453 10.2828L16.6739 7.28284C16.846 6.07797 15.9111 5 14.694 5H8" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="8.5" cy="14.5" r="1.5" :fill="props.color"/>
    <circle cx="15.5" cy="14.5" r="1.5" :fill="props.color"/>
    </svg>

    <svg
    v-else-if="icon == 'edit'" 
    width="24" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.95506 2.99499L5.26838 7.85018C5.21721 7.90319 5.19163 7.9297 5.17041 7.95927C5.15156 
        7.98553 5.13531 8.01356 5.12188 8.04296C5.10675 8.07606 5.09645 8.11143 5.07586 8.18217L5.07586 8.18218L4.76313 9.25641C4.63171 9.70784 
        4.566 9.93356 4.62341 10.0885C4.67347 10.2235 4.77931 10.3304 4.91384 10.3818C5.06817 10.4407 5.29453 10.3773 5.74724 10.2503L6.86002 
        9.93828L6.86004 9.93827L6.86006 9.93826C6.93358 9.91765 6.97034 9.90734 7.0047 9.89183C7.03521 9.87807 7.06426 9.86127 7.09142 9.84169C7.122 
        9.81965 7.14928 9.79292 7.20385 9.73947L12.0006 5.04054L9.95506 2.99499ZM13.0722 3.99081L13.6085 3.46543L13.6085 3.46543C13.8121 3.26597 
        13.9139 3.16623 13.952 3.05075C13.9855 2.9492 13.9856 2.83958 13.9522 2.73799C13.9142 2.62248 13.8125 2.52265 13.6091 2.323L13.6091 
        2.323L13.609 2.32299L12.6415 1.3734C12.4401 1.17579 12.3395 1.07698 12.2242 1.04104C12.1229 1.00944 12.0141 1.01091 11.9137 1.04524C11.7995 
        1.08428 11.7015 1.18577 11.5055 1.38876L10.997 1.9156L13.0722 3.99081Z" :stroke="props.color"/>
        <path d="M7.93553 1.70209H2.78589C1.68132 1.70209 0.785889 2.59752 0.785889 3.70209V12.214C0.785889 13.3185 1.68132 14.214 2.78589 
        14.214H11.2978C12.4023 14.214 13.2978 13.3185 13.2978 12.214V7.06432" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    <svg 
    v-else-if="icon == 'manage_order'"
    width="22" height="20"
        viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0.783325C1.48122 0.783325 0.25 2.01454 0.25 3.53332V14.4667C0.25 15.9854 1.48122 17.2167 
        3 17.2167H12.7333C13.1475 17.2167 13.4833 16.8809 13.4833 16.4667V16.4009C13.2398 16.4441 12.9891 16.4667 12.7332 16.4667C11.836 16.4667 
        11.0035 16.1897 10.3164 15.7167H3C2.30964 15.7167 1.75 15.157 1.75 14.4667V3.53332C1.75 2.84297 2.30964 2.28333 3 2.28333H9.52963C9.94757 
        2.28333 10.3379 2.4922 10.5697 2.83995L11.7734 4.6455C11.9103 4.85084 11.9833 5.0921 11.9833 5.33888V7.999C12.2268 7.95584 12.4774 7.93332 
        12.7332 7.93332C12.9891 7.93332 13.2398 7.95585 13.4833 7.99904V5.33888C13.4833 4.79596 13.3226 4.26519 13.0215 3.81345L11.8178 2.0079C11.3077 
        1.24285 10.4491 0.783325 9.52963 0.783325H3Z" :fill="props.color"/>
        <circle cx="13.2667" cy="12.2667" r="4.26667" :stroke="props.color" stroke-width="1.5"/>
        <path d="M4.19995 5.79999H9.53328" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.19995 9H6.33328" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 12.5L13 13.5L15 11" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


    <svg 
    v-else-if="icon == 'order_details'"
    width="22" height="20"
        viewBox="0 0 15 12" fill="none" :stroke="props.color" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 5H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 9H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 9.5L14 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="7" r="3"  stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'share'"
    width="22" height="20"
    viewBox="0 0 13 14" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="7" r="2" stroke-width="1.5"/>
    <circle cx="10" cy="3" r="2" stroke-width="1.5"/>
    <circle cx="10" cy="11" r="2" stroke-width="1.5"/>
    <path d="M8 4L5 6" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M5 8L8 10" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <svg
    v-else-if="icon == 'truck'"
    width="22" height="20"
    viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 0C1.23122 0 0 1.23122 0 2.75V9.74754C0 11.2163 1.1514 12.4161 2.60081 12.4936C2.589 12.3993 2.58291 
        12.3032 2.58291 12.2058C2.58291 11.7623 2.70889 11.3483 2.92702 10.9975H2.75C2.05964 10.9975 1.5 10.4379 1.5 9.74754V2.75C1.5 2.05965 2.05965 1.5 2.75 
        1.5H7.91461C8.60497 1.5 9.16461 2.05964 9.16461 2.75V4.41005L9.16459 4.41584L9.16461 4.42164V9.74754C9.16461 10.4374 8.60581 10.9967 7.91618 10.9975L7.91461 
        10.9975H6.82112C6.41683 10.3474 5.696 9.91461 4.87408 9.91461C3.60871 9.91461 2.58292 10.9404 2.58292 12.2058C2.58292 13.4711 3.60871 14.4969 4.87408 
        14.4969C6.0406 14.4969 7.00351 13.6251 7.14683 12.4975H7.91461L7.91789 12.4975H9.01661C9.00447 12.402 8.99821 12.3046 8.99821 12.2058C8.99821 11.9468 
        9.04118 11.6978 9.12039 11.4657C9.04119 11.6978 8.99822 11.9468 8.99822 12.2058C8.99822 13.4711 10.024 14.4969 11.2894 14.4969C12.4573 14.4969 13.4211 
        13.6231 13.5626 12.4936C15.012 12.416 16.1634 11.2162 16.1634 9.74754V6.41584C16.1634 4.89706 14.9321 3.66584 13.4134 3.66584H10.6646V2.75C10.6646 1.23122
        9.4334 0 7.91461 0H2.75ZM11.2894 9.91461C11.0685 9.91461 10.8549 9.94587 10.6528 10.0042C10.6606 9.9197 10.6646 9.83408 10.6646 9.74754V5.16584H13.4134C14.1037 
        5.16584 14.6634 5.72549 14.6634 6.41584V9.74754C14.6634 10.4379 14.1037 10.9975 13.4134 10.9975H13.2364C12.8321 10.3474 12.1113 9.91461 11.2894 9.91461ZM11.2894 
        12.9969C11.7263 12.9969 12.0805 12.6427 12.0805 12.2058C12.0805 11.7688 11.7263 11.4146 11.2894 11.4146C10.8524 11.4146 10.4982 11.7688 10.4982 12.2058C10.4982 
        12.6427 10.8524 12.9969 11.2894 12.9969ZM5.66523 12.2058C5.66523 12.6427 5.31102 12.9969 4.87408 12.9969C4.43713 12.9969 4.08292 12.6427 4.08292 12.2058C4.08292 
        11.7688 4.43713 11.4146 4.87408 11.4146C5.31102 11.4146 5.66523 11.7688 5.66523 12.2058Z" :fill="props.color"/>
    </svg>

    <svg 
    v-else-if="icon == 'export'"
    width="22" height="20"
    viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
    <path d="M1 9V11C1 12.1046 1.89543 13 3 13H11C12.1046 13 13 12.1046 13 11V9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 9V1M7 1L4 4M7 1L10 4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg
    v-else-if="icon == 'filter'"
    width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8546 2.75C10.9484 2.51839 11 2.26523 11 2C11 1.73477 10.9484 1.48161 10.8546 1.25H15C15.4142 1.25 15.75 1.58579 15.75 2C15.75 2.41421 15.4142 2.75 15 2.75H10.8546ZM7.14538 2.75H1C0.585786 2.75 0.25 2.41421 0.25 2C0.25 1.58579 0.585786 1.25 1 1.25H7.14538C7.05163 1.48161 7 1.73477 7 2C7 2.26523 7.05163 2.51839 7.14538 2.75Z" :fill="props.color"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85462 7.75C6.94837 7.51839 7 7.26523 7 7C7 6.73477 6.94837 6.48161 6.85462 6.25H15C15.4142 6.25 15.75 6.58579 15.75 7C15.75 7.41421 15.4142 7.75 15 7.75H6.85462ZM3.14538 7.75H1C0.585786 7.75 0.25 7.41421 0.25 7C0.25 6.58579 0.585786 6.25 1 6.25H3.14538C3.05163 6.48161 3 6.73477 3 7C3 7.26523 3.05163 7.51839 3.14538 7.75Z" :fill="props.color"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8546 12.75C12.9484 12.5184 13 12.2652 13 12C13 11.7348 12.9484 11.4816 12.8546 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.8546ZM9.14538 12.75H1C0.585786 12.75 0.25 12.4142 0.25 12C0.25 11.5858 0.585786 11.25 1 11.25H9.14538C9.05163 11.4816 9 11.7348 9 12C9 12.2652 9.05163 12.5184 9.14538 12.75Z" :fill="props.color"/>
    <circle cx="9" cy="2" r="1.25" :stroke="props.color" stroke-width="1.5"/>
    <circle cx="5" cy="7" r="1.25" :stroke="props.color" stroke-width="1.5"/>
    <circle cx="11" cy="12" r="1.25" :stroke="props.color" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'plus'"
    width="22" height="20"
    viewBox="0 0 16 16" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke-width="1.5"/>
    <path d="M5 8H11" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8 5V11" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <svg 
    v-else-if="icon == 'globle'"
    width="24" height="24" viewBox="0 0 18 18" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8"  stroke-width="1.5"/>
    <ellipse cx="9" cy="9" rx="3" ry="8" stroke-width="1.5"/>
    <ellipse cx="9" cy="9" rx="3" ry="8" transform="rotate(-90 9 9)" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'reset'"
    width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.80553 14.5556C4.185 14.5556 1.24997 11.6205 1.24997 8C1.24997 4.37947 4.18499 1.44445 7.80553 1.44445C11.4261 1.44445 14.3611 4.37947 14.3611 8" 
    :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 7.01666L14.0333 9.63889L12.0667 7.01666L16 7.01666Z" :fill="props.color" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" 
    stroke-linejoin="round"/>
    </svg>

    <svg
    v-else-if="icon == 'store'"
    width="24" viewBox="0 0 18 16" fill="transparent" fill-opacity="0" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
    <path d="M14.2792 1H3.72076C3.29033 1 2.90819 1.27543 2.77208 1.68377L1.43874 5.68377C1.2229 6.3313 1.70487 7 2.38743 7H15.6126C16.2951 7 16.7771 6.3313 16.5613 5.68377L15.2279 1.68377C15.0918 1.27543 14.7097 1 14.2792 1Z" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M3 7V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M5.5 1V7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M12.5 1V7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M9 1V7" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    <path d="M7 15V11C7 9.89543 7.89543 9 9 9V9C10.1046 9 11 9.89543 11 11V15" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>

    <svg
    v-else-if="icon == 'copy'" 
    width="24" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
    <rect x="1" y="4" width="10.7692" height="11" rx="1" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M5.30774 1H13C14.1046 1 15 1.89543 15 3V11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg 
    v-else-if="icon == 'delivery'"
    width="24" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="props.color">
    <path d="M5.23539 7.11765H2.41187" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.58824 1H11.3529M11.3529 1L6.17647 4.29412M11.3529 1L17 4.29412M6.17647 4.29412H1M6.17647 4.29412L11.3529 7.58824M11.3529 7.58824L17 4.29412M11.3529 7.58824V13.2353M17 4.29412V9.47059L11.3529 13.2353M11.3529 13.2353L5.70588 9.47059H1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 1H3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg 
    v-else-if="icon == 'express_cart'"
    width="24" height="20" viewBox="0 0 20 19" fill="none" :stroke="props.color" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 1H4.77924C5.20967 1 5.59181 1.27543 5.72792 1.68377L6.27208 3.31623C6.40819 3.72457 6.79033 4 7.22076 4H18.1126C18.7951 4 19.2771 4.6687 19.0613 5.31623L16.7279 12.3162C16.5918 12.7246 16.2097 13 15.7792 13H7.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 7L3.5 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 9.5H1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="7.58839" cy="16.1704" rx="1" ry="1.15872" transform="rotate(15 7.58839 16.1704)" stroke-width="1.5"/>
    <ellipse cx="15.7659" cy="16.1704" rx="1" ry="1.15872" transform="rotate(15 15.7659 16.1704)" stroke-width="1.5"/>
    </svg> 

    <svg 
    v-else-if="icon == 'shopping_bag'"
    width="22" height="20"
    :stroke="props.color" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H3C1.89543 4 1 4.89543 1 6V13C1 14.1046 1.89543 15 3 15H11C12.1046 15 13 14.1046 13 13V6C13 4.89543 12.1046 4 11 4Z" stroke-width="1.5"/>
    <path d="M5 4V3C5 1.89543 5.89543 1 7 1V1C8.10457 1 9 1.89543 9 3V4" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'wishlist'"
    width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.56278 9.57563C3.62363 8.63648 3.62363 7.11382 4.56278 6.17468V6.17468C5.50193 5.23553 7.02458 5.23553 7.96373 6.17468L11.9315 10.1425L9.94477 
    12.1292C9.16372 12.9102 7.89739 12.9102 7.11634 12.1292L4.56278 9.57563Z" fill="#FF5050" :stroke="props.color" stroke-width="1.5"/>
    <path d="M13.4375 9.57563C14.3766 8.63648 14.3766 7.11382 13.4375 6.17468V6.17468C12.4983 5.23553 10.9757 5.23553 10.0365 6.17468L5.61215 10.599L8.306 
    13.2929C8.69652 13.6834 9.32968 13.6834 9.72021 13.2929L13.4375 9.57563Z" fill="#FF8989" :stroke="props.color" stroke-width="1.5"/>
    <circle cx="9" cy="9" r="8" :stroke="props.color" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'stop_live'"
    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="7" width="6" height="6" rx="1" :fill="props.color"/>
    <circle cx="10" cy="10" r="9" :stroke="props.color" stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'stop_live2'"
    width="16" height="16" viewBox="0 0 16 16" fill="#D1D1D1" xmlns="http://www.w3.org/2000/svg" class="hover:fill-slate-700">
    <circle cx="8" cy="8" r="8"  fill-opacity="0.8" />
    <path d="M10.25 5H5.75C5.3375 5 5 5.3375 5 5.75V10.25C5 10.6625 5.3375 11 5.75 11H10.25C10.6625 11 11 10.6625 11 10.25V5.75C11 5.3375 10.6625 5 10.25 5ZM8 
    0C3.58125 0 0 3.58125 0 8C0 12.4187 3.58125 16 8 16C12.4187 16 16 12.4187 16 8C16 3.58125 12.4187 0 8 0ZM8 14.5C4.41563 14.5 1.5 11.5841 1.5 8C1.5 4.41594 
    4.41563 1.5 8 1.5C11.5844 1.5 14.5 4.41594 14.5 8C14.5 11.5841 11.5844 14.5 8 14.5Z" fill="white" fill-opacity="0.8"/>
    </svg>

    <svg 
    v-else-if="icon == 'alert_full'"
    width="24" height="24" viewBox="3 3 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#E80000"></circle>
    <path d="M12 13.9857C12 14.2587 12.5152 10.5525 12.8663 7.98253C12.9373 7.46244 12.5328 7 12.0079 7C11.4775 7 11.0714 7.47127 11.1502 7.99576C11.5007 10.3284 12 13.717 12 13.9857Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round"></path>
    <circle cx="12" cy="17" r="1" fill="white" stroke="white"></circle>
    </svg>
    
    <svg 
    v-else-if="icon == 'new_user'"
    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.0877 6.42341C3.0877 6.95384 2.87699 7.46255 2.50192 7.83762L1.66977 8.66977C0.888722 9.45082 0.888723 10.7171 1.66977 11.4982L2.50192 12.3303C2.87699 12.7054 3.0877 13.2141 3.0877 13.7446V15.1643C3.0877 16.2688 3.98313 17.1643 5.0877 17.1643H6.50742C7.03785 17.1643 7.54656 17.375 7.92164 17.7501L8.75375 18.5822C9.5348 19.3632 10.8011 19.3632 11.5822 18.5822L12.4143 17.7501C12.7894 17.375 13.2981 17.1643 13.8285 17.1643H15.2483C16.3529 17.1643 17.2483 16.2688 17.2483 15.1643V13.7445C17.2483 13.2141 17.459 12.7054 17.8341 12.3303L18.6662 11.4982C19.4472 10.7171 19.4472 9.45082 18.6662 8.66977L17.8341 7.83768C17.459 7.46261 17.2483 6.9539 17.2483 6.42347V5.00369C17.2483 3.89912 16.3529 3.00369 15.2483 3.00369H13.8285C13.2981 3.00369 12.7894 2.79298 12.4143 2.4179L11.5822 1.58579C10.8011 0.804738 9.5348 0.804738 8.75375 1.58579L7.92164 2.4179C7.54656 2.79298 7.03786 3.00369 6.50742 3.00369H5.0877C3.98313 3.00369 3.0877 3.89912 3.0877 5.00369V6.42341Z" fill="#FFEE54"/>
    <path d="M4.57366 12.084C4.41406 12.084 4.2998 12.0594 4.23089 12.0104C4.16197 11.9575 4.12026 11.8914 4.10575 11.8121C4.09124 11.7329 4.08398 11.6498 4.08398 11.5629V8.62363C4.08398 8.54056 4.09124 8.46128 4.10575 8.38576C4.12026 8.31025 4.16197 8.24795 4.23089 8.19887C4.30343 8.14979 4.42131 8.12525 4.58454 8.12525C4.74414 8.12525 4.85295 8.14601 4.91099 8.18754C4.96902 8.22908 5.02162 8.28193 5.06877 8.34612L6.42898 10.249V8.62363C6.42898 8.54056 6.43623 8.46128 6.45074 8.38576C6.46888 8.31025 6.5124 8.24795 6.58132 8.19887C6.65024 8.14979 6.76631 8.12525 6.92953 8.12525C7.09638 8.12525 7.21245 8.15168 7.27774 8.20453C7.34666 8.25362 7.38837 8.3178 7.40288 8.39709C7.41739 8.47638 7.42464 8.55944 7.42464 8.64628V11.5686C7.42464 11.6517 7.41739 11.7329 7.40288 11.8121C7.38837 11.8914 7.34666 11.9575 7.27774 12.0104C7.20883 12.0594 7.09094 12.084 6.92409 12.084C6.80077 12.084 6.70646 12.0727 6.64117 12.05C6.57951 12.0311 6.52691 11.9915 6.48338 11.9311L5.07421 9.99418V11.5686C5.07421 11.6517 5.06696 11.7329 5.05245 11.8121C5.03794 11.8914 4.99623 11.9575 4.92731 12.0104C4.85839 12.0594 4.74051 12.084 4.57366 12.084Z" fill="black"/>
    <path d="M8.36004 12.084C8.19682 12.084 8.08074 12.0594 8.01183 12.0104C7.94291 11.9575 7.9012 11.8914 7.88669 11.8121C7.87218 11.7291 7.86493 11.646 7.86493 11.5629V8.63496C7.86493 8.43862 7.9012 8.30459 7.97374 8.23285C8.04991 8.15734 8.18412 8.11958 8.37636 8.11958H10.3677C10.4511 8.11958 10.5291 8.12713 10.6017 8.14224C10.6778 8.15734 10.7395 8.20076 10.7866 8.2725C10.8374 8.34423 10.8628 8.46694 10.8628 8.64062C10.8628 8.81052 10.8374 8.93134 10.7866 9.00308C10.7395 9.07481 10.6778 9.11823 10.6017 9.13334C10.5255 9.14844 10.4457 9.15599 10.3623 9.15599H8.86059V9.66004H9.86715C9.95057 9.66004 10.0249 9.66759 10.0902 9.68269C10.1555 9.69402 10.2081 9.72989 10.248 9.7903C10.2879 9.8507 10.3079 9.95642 10.3079 10.1074C10.3079 10.2509 10.2879 10.3548 10.248 10.4189C10.2081 10.4793 10.1537 10.5152 10.0848 10.5265C10.0159 10.5379 9.93969 10.5435 9.85626 10.5435H8.86059V11.0476H10.3677C10.4511 11.0476 10.5291 11.0551 10.6017 11.0702C10.6778 11.0853 10.7395 11.1288 10.7866 11.2005C10.8374 11.2722 10.8628 11.3949 10.8628 11.5686C10.8628 11.7385 10.8374 11.8593 10.7866 11.9311C10.7395 12.0028 10.6778 12.0462 10.6017 12.0613C10.5255 12.0764 10.4457 12.084 10.3623 12.084H8.36004Z" fill="black"/>
    <path d="M12.5959 12.0783C12.4799 12.0783 12.3892 12.0538 12.3239 12.0047C12.2586 11.9556 12.2114 11.9028 12.1824 11.8461C12.1534 11.7857 12.1353 11.7461 12.128 11.7272L11.1487 8.80486C11.0943 8.61608 11.0852 8.47638 11.1215 8.38576C11.1614 8.29137 11.2756 8.21209 11.4642 8.1479C11.5876 8.10637 11.6873 8.08749 11.7635 8.09127C11.8397 8.09504 11.9031 8.12713 11.9539 8.18754C12.0047 8.24795 12.05 8.34234 12.0899 8.47072L12.6558 10.1924L13.1019 8.49903C13.1128 8.46128 13.1309 8.41219 13.1563 8.35178C13.1853 8.29137 13.2325 8.23852 13.2978 8.19321C13.3631 8.14412 13.4574 8.11958 13.5807 8.11958C13.7185 8.11958 13.8201 8.14601 13.8854 8.19887C13.9543 8.25173 14.0015 8.30836 14.0269 8.36877C14.0523 8.42918 14.0704 8.47449 14.0813 8.5047L14.5274 10.2037L15.0933 8.47072C15.1332 8.34612 15.1767 8.25362 15.2238 8.19321C15.2746 8.12902 15.3399 8.09315 15.4197 8.0856C15.4995 8.07805 15.6011 8.09693 15.7244 8.14224C15.855 8.19132 15.9475 8.24418 16.0019 8.30081C16.0563 8.35367 16.0835 8.41974 16.0835 8.49903C16.0871 8.57832 16.0708 8.68026 16.0345 8.80486L15.0606 11.7272C15.0534 11.7498 15.0352 11.7895 15.0062 11.8461C14.9808 11.9028 14.9355 11.9556 14.8702 12.0047C14.8049 12.0538 14.7106 12.0783 14.5873 12.0783C14.4639 12.0783 14.3678 12.05 14.2989 11.9934C14.23 11.933 14.181 11.8725 14.152 11.8121C14.123 11.748 14.1067 11.7102 14.103 11.6989L13.5916 9.95453L13.0802 11.6932C13.0765 11.7121 13.0602 11.7536 13.0312 11.8178C13.0022 11.8782 12.9532 11.9367 12.8843 11.9934C12.819 12.05 12.7229 12.0783 12.5959 12.0783Z" fill="black"/>
    <path d="M13.7445 3.00369C13.2141 3.00369 12.7054 2.79298 12.3303 2.4179L11.4982 1.58579C10.7171 0.804738 9.45082 0.804738 8.66977 1.58579L7.83765 2.4179C7.46258 2.79298 6.95387 3.00369 6.42344 3.00369H5.00372C3.89915 3.00369 3.00372 3.89912 3.00372 5.00369V6.42341C3.00372 6.95384 2.793 7.46255 2.41793 7.83762L1.58579 8.66977C0.804737 9.45082 0.804738 10.7171 1.58579 11.4982L2.41793 12.3303C2.793 12.7054 3.00372 13.2141 3.00372 13.7446V15.1643C3.00372 16.2688 3.89915 17.1643 5.00372 17.1643H6.42344C6.95387 17.1643 7.46258 17.375 7.83765 17.7501L8.66977 18.5822C9.45082 19.3632 10.7171 19.3632 11.4982 18.5822L12.3303 17.7501C12.7054 17.375 13.2141 17.1643 13.7445 17.1643H15.1643C16.2689 17.1643 17.1643 16.2688 17.1643 15.1643V13.7445C17.1643 13.2141 17.375 12.7054 17.7501 12.3303L18.5822 11.4982C19.3632 10.7171 19.3632 9.45082 18.5822 8.66977L17.7501 7.83768C17.375 7.46261 17.1643 6.9539 17.1643 6.42347V5.00369" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.584 3.08398H16.084" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </svg>



    

</template>

<script setup>
    import { useDarkModeStore } from "@/stores/dark-mode";
    import { computed } from "vue";
    
    const props = defineProps({
      icon: {
        type: String,
        default: "",
      },
      color:{
        type: String,
        default: "black",
      }
    });
    
    const darkModeStore = useDarkModeStore();
    const iconColor = computed(() =>
      !darkModeStore.darkMode ? props.color : "#ffffff"
    );
</script>

<style scoped>
button[aria-selected="true"] svg{
fill:white;
}
button[aria-selected="true"] svg .opposite{
fill: theme('colors.primary');
}
</style>