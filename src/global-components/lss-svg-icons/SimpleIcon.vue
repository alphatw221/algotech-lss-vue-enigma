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
        width="24" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 9.5C1.75 6.04822 4.54822 3.25 8 3.25C11.4518 3.25 14.25 6.04822 14.25 9.5C14.25 12.3164 
        12.3871 14.6977 9.82631 15.4789L10.3009 16.9027C13.4576 15.9226 15.75 12.979 15.75 9.5C15.75 5.21979 12.2802 1.75 8 1.75C3.71979 1.75 0.25 5.21979 
        0.25 9.5C0.25 12.982 2.54632 15.9277 5.70718 16.9052L6.18729 15.4831C3.61949 14.7061 1.75 12.3214 1.75 9.5Z" :fill="props.color"/>
        <path d="M8 1V4" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="8" cy="10" r="2" :stroke="props.color" stroke-width="1.5"/>
        <path d="M8.63263 11.8979L9.34414 11.6607C9.21317 11.2678 8.78849 11.0554 8.39556 11.1863L8.63263 11.8979ZM7.39464 11.9068L7.6214 11.1919C7.23171 
        11.0682 6.81481 11.2795 6.68404 11.6669L7.39464 11.9068ZM5 19L4.2894 18.7601C4.21213 18.989 4.24985 19.2411 4.39073 19.4374C4.53161 19.6336 4.75841 
        19.75 5 19.75V19ZM11 19V19.75C11.2411 19.75 11.4675 19.6341 11.6084 19.4385C11.7494 19.243 11.7877 18.9915 11.7115 18.7628L11 19ZM8.39556 11.1863C8.2722 
        11.2274 8.13949 11.25 8 11.25V12.75C8.30268 12.75 8.5954 12.7008 8.8697 12.6094L8.39556 11.1863ZM8 11.25C7.86683 11.25 7.73989 11.2294 7.6214 
        11.1919L7.16788 12.6217C7.43132 12.7052 7.71114 12.75 8 12.75V11.25ZM6.68404 11.6669L4.2894 18.7601L5.7106 19.2399L8.10524 12.1466L6.68404 11.6669ZM5 
        19.75H11V18.25H5V19.75ZM11.7115 18.7628L9.34414 11.6607L7.92111 12.1351L10.2885 19.2372L11.7115 18.7628Z" :fill="props.color"/>
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
        viewBox="0 0 15 12" fill="none" :stroke="props.color" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 5H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1 9H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 9.5L14 11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="10" cy="7" r="3"  stroke-width="1.5"/>
    </svg>

    <svg 
    v-else-if="icon == 'share'"
    viewBox="0 0 13 14" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="7" r="2" stroke-width="1.5"/>
    <circle cx="10" cy="3" r="2" stroke-width="1.5"/>
    <circle cx="10" cy="11" r="2" stroke-width="1.5"/>
    <path d="M8 4L5 6" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M5 8L8 10" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

    <svg
    v-else-if="icon == 'truck'"
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
    :stroke="props.color" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H3C1.89543 4 1 4.89543 1 6V13C1 14.1046 1.89543 15 3 15H11C12.1046 15 13 14.1046 13 13V6C13 4.89543 12.1046 4 11 4Z" stroke-width="1.5"/>
    <path d="M5 4V3C5 1.89543 5.89543 1 7 1V1C8.10457 1 9 1.89543 9 3V4" stroke-width="1.5"/>
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