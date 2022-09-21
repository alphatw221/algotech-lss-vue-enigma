<template>
  <span>
    <svg
      v-if="icon == 'audio'"
      width="15"
      viewBox="0 0 55 80"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <g transform="matrix(1 0 0 -1 0 80)">
        <rect width="10" height="20" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="4.3s"
            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="15" width="10" height="80" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="80;55;33;5;75;23;73;33;12;14;60;80"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" width="10" height="50" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="1.4s"
            values="50;34;78;23;56;23;34;76;80;54;21;50"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="45" width="10" height="30" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="30;45;13;80;56;72;45;76;34;23;67;30"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'ball-triangle'"
      width="20"
      viewBox="0 0 57 57"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <circle cx="5" cy="50" r="5" :fill="iconColor">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;5;50;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              values="5;27;49;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="5" r="5" :fill="iconColor">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              from="5"
              to="5"
              values="5;50;50;5"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="2.2s"
              from="27"
              to="27"
              values="27;49;5;27"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="49" cy="50" r="5" :fill="iconColor">
            <animate
              attributeName="cy"
              begin="0s"
              dur="2.2s"
              values="50;50;5;50"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              from="49"
              to="49"
              begin="0s"
              dur="2.2s"
              values="49;5;27;49"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'bars'"
      width="20"
      viewBox="0 0 135 140"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <rect y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
    <svg
      v-else-if="icon == 'circles'"
      width="20"
      viewBox="0 0 135 135"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <path
        d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="-360 67 67"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 67 67"
          to="360 67 67"
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <svg
      v-else-if="icon == 'grid'"
      width="20"
      viewBox="0 0 105 105"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <circle cx="12.5" cy="12.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="0s"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">
        <animate
          attributeName="fill-opacity"
          begin="100ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="12.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="300ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="52.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="600ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="12.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="800ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="52.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="400ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="700ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="52.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="500ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="92.5" cy="92.5" r="12.5">
        <animate
          attributeName="fill-opacity"
          begin="200ms"
          dur="1s"
          values="1;.2;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <svg
      v-else-if="icon == 'hearts'"
      width="30"
      viewBox="0 0 140 64"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <path
        d="M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z"
        fill-opacity=".5"
      >
        <animate
          attributeName="fill-opacity"
          begin="0s"
          dur="1.4s"
          values="0.5;1;0.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z"
        fill-opacity=".5"
      >
        <animate
          attributeName="fill-opacity"
          begin="0.7s"
          dur="1.4s"
          values="0.5;1;0.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"
      />
    </svg>
    <svg
      v-else-if="icon == 'oval'"
      width="25"
      viewBox="-2 -2 42 42"
      xmlns="http://www.w3.org/2000/svg"
      :stroke="iconColor"
      class="w-full h-full"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="4">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'puff'"
      width="25"
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      :stroke="iconColor"
      class="w-full h-full"
    >
      <g fill="none" fill-rule="evenodd" stroke-width="4">
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="1">
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'rings'"
      width="30"
      viewBox="0 0 45 45"
      xmlns="http://www.w3.org/2000/svg"
      :stroke="iconColor"
      class="w-full h-full"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        transform="translate(1 1)"
        stroke-width="3"
      >
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="1.5s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="1.5s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="1.5s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="6" stroke-opacity="0">
          <animate
            attributeName="r"
            begin="3s"
            dur="3s"
            values="6;22"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="3s"
            dur="3s"
            values="1;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            begin="3s"
            dur="3s"
            values="2;0"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="22" cy="22" r="8">
          <animate
            attributeName="r"
            begin="0s"
            dur="1.5s"
            values="6;1;2;3;4;5;6"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'spinning-circles'"
      width="20"
      viewBox="0 0 58 58"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(2 1)" :stroke="iconColor" stroke-width="1.5">
          <circle
            cx="42.601"
            cy="11.462"
            r="5"
            fill-opacity="1"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="1;0;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="49.063"
            cy="27.063"
            r="5"
            fill-opacity="0"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;1;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="42.601"
            cy="42.663"
            r="5"
            fill-opacity="0"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;1;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="49.125" r="5" fill-opacity="0" :fill="iconColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;1;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="11.399"
            cy="42.663"
            r="5"
            fill-opacity="0"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;1;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="4.938"
            cy="27.063"
            r="5"
            fill-opacity="0"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;1;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="11.399"
            cy="11.462"
            r="5"
            fill-opacity="0"
            :fill="iconColor"
          >
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="5" r="5" fill-opacity="0" :fill="iconColor">
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;0;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'tail-spin'"
      width="20"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full"
    >
      <defs>
        <linearGradient id="a" x1="8.042%" y1="0%" x2="65.682%" y2="23.865%">
          <stop :stop-color="iconColor" stop-opacity="0" offset="0%" />
          <stop :stop-color="iconColor" offset="100%" />
          <stop :stop-color="iconColor" stop-opacity=".631" offset="63.146%" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <path
            id="Oval-2"
            d="M36 18c0-9.94-8.06-18-18-18"
            stroke="url(#a)"
            stroke-width="3"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle :fill="iconColor" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
    <svg
      v-else-if="icon == 'three-dots'"
      width="25"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
      :fill="iconColor"
      class="w-full h-full"
    >
      <circle cx="15" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="15" r="9" fill-opacity="0.3">
        <animate
          attributeName="r"
          from="9"
          to="9"
          begin="0s"
          dur="0.8s"
          values="9;15;9"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="105" cy="15" r="15">
        <animate
          attributeName="r"
          from="15"
          to="15"
          begin="0s"
          dur="0.8s"
          values="15;9;15"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    <svg v-else-if="icon == 'live'"
    id="eBuF8akfw7J1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
      <svg:style type="text/css"><![CDATA[
            #eBuF8akfw7J2_ts {animation: eBuF8akfw7J2_ts__ts 1000ms linear infinite normal forwards}@keyframes eBuF8akfw7J2_ts__ts { 0% {transform: translate(12px,12px) scale(1,1)} 10% {transform: translate(12px,12px) scale(1,1);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 30% {transform: translate(12px,12px) scale(1.15,1.15);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 70% {transform: translate(12px,12px) scale(1.15,1.15);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 90% {transform: translate(12px,12px) scale(1,1)} 100% {transform: translate(12px,12px) scale(1,1)}} #eBuF8akfw7J2 {animation: eBuF8akfw7J2_s_p 1000ms linear infinite normal forwards}@keyframes eBuF8akfw7J2_s_p { 0% {stroke: #000} 10% {stroke: #000;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 30% {stroke: #ff1818;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 70% {stroke: #ff1818;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 90% {stroke: #000} 100% {stroke: #000}}
            ]]></svg:style>
      <g id="eBuF8akfw7J2_ts" transform="translate(12,12) scale(1,1)"><circle id="eBuF8akfw7J2" r="3.36" transform="translate(0,0)" fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"/></g><g><g><path d="M7.68,3.84c0,0-.86,0-1.92,0s-1.92.86-1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M3.84,16.32c0,0,0,.86,0,1.92s.86,1.92,1.92,1.92s1.92,0,1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M16.32,3.84c0,0,.86,0,1.92,0s1.92.86,1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M20.16,16.32c0,0,0,.86,0,1.92s-.86,1.92-1.92,1.92-1.92,0-1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g></svg>

    <svg v-else-if="icon == 'live2'"
    id="e4xElM8cGZV1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
      <svg:style type="text/css"><![CDATA[
      #e4xElM8cGZV2_ts {animation: e4xElM8cGZV2_ts__ts 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV2_ts__ts { 0% {transform: translate(12px,12px) scale(0,0)} 18.75% {transform: translate(12px,12px) scale(0,0);animation-timing-function: cubic-bezier(0.445,0.05,0.55,0.95)} 37.5% {transform: translate(12px,12px) scale(1,1);animation-timing-function: cubic-bezier(0.445,0.05,0.55,0.95)} 68.75% {transform: translate(12px,12px) scale(1,1);animation-timing-function: cubic-bezier(0.445,0.05,0.55,0.95)} 87.5% {transform: translate(12px,12px) scale(0,0)} 100% {transform: translate(12px,12px) scale(0,0)}} #e4xElM8cGZV2 {animation: e4xElM8cGZV2_s_p 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV2_s_p { 0% {stroke: #000} 18.75% {stroke: #000} 37.5% {stroke: #ff0f0f} 68.75% {stroke: #ff0f0f} 87.5% {stroke: #000} 100% {stroke: #000}} #e4xElM8cGZV3_tr {animation: e4xElM8cGZV3_tr__tr 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV3_tr__tr { 0% {transform: translate(12px,12px) rotate(0deg)} 12.5% {transform: translate(12px,12px) rotate(0deg);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 31.25% {transform: translate(12px,12px) rotate(90deg);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 75% {transform: translate(12px,12px) rotate(90deg);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 93.75% {transform: translate(12px,12px) rotate(0deg)} 100% {transform: translate(12px,12px) rotate(0deg)}} #e4xElM8cGZV4_to {animation: e4xElM8cGZV4_to__to 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV4_to__to { 0% {transform: translate(9.6px,9.6px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 31.25% {transform: translate(5.76px,5.76px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 75% {transform: translate(5.76px,5.76px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 87.5% {transform: translate(9.6px,9.6px)} 100% {transform: translate(9.6px,9.6px)}} #e4xElM8cGZV6_to {animation: e4xElM8cGZV6_to__to 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV6_to__to { 0% {transform: translate(9.6px,14.4px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 31.25% {transform: translate(5.76px,18.24px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 75% {transform: translate(5.76px,18.24px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 100% {transform: translate(9.6px,14.4px)}} #e4xElM8cGZV8_to {animation: e4xElM8cGZV8_to__to 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV8_to__to { 0% {transform: translate(14.4px,9.6px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 31.25% {transform: translate(18.24px,5.76px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 75% {transform: translate(18.24px,5.76px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 87.5% {transform: translate(14.4px,9.6px)} 100% {transform: translate(14.4px,9.6px)}} #e4xElM8cGZV10_to {animation: e4xElM8cGZV10_to__to 1600ms linear infinite normal forwards}@keyframes e4xElM8cGZV10_to__to { 0% {transform: translate(14.4px,14.4px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 31.25% {transform: translate(18.24px,18.24px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 75% {transform: translate(18.24px,18.24px);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 93.75% {transform: translate(14.4px,14.4px)} 100% {transform: translate(14.4px,14.4px)}}
      ]]></svg:style>
      <g id="e4xElM8cGZV2_ts" transform="translate(12,12) scale(0,0)"><circle id="e4xElM8cGZV2" r="3.36" transform="translate(0,0)" fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"/></g><g id="e4xElM8cGZV3_tr" transform="translate(12,12) rotate(0)"><g transform="translate(-12,-12)"><g id="e4xElM8cGZV4_to" transform="translate(9.6,9.6)"><g transform="translate(-5.76,-5.76)"><path d="M7.68,3.84c0,0-.86,0-1.92,0s-1.92.86-1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><g id="e4xElM8cGZV6_to" transform="translate(9.6,14.4)"><g transform="translate(-5.76,-18.24)"><path d="M3.84,16.32c0,0,0,.86,0,1.92s.86,1.92,1.92,1.92s1.92,0,1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><g id="e4xElM8cGZV8_to" transform="translate(14.4,9.6)"><g transform="translate(-18.24,-5.76)"><path d="M16.32,3.84c0,0,.86,0,1.92,0s1.92.86,1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><g id="e4xElM8cGZV10_to" transform="translate(14.4,14.4)"><g transform="translate(-18.24,-18.24)"><path d="M20.16,16.32c0,0,0,.86,0,1.92s-.86,1.92-1.92,1.92-1.92,0-1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g></g></g></svg>

    <svg 
    v-else-if="icon == 'live3'"
    id="eoJZ2CG9pvz1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
    <svg:style type="text/css"><![CDATA[
    #eoJZ2CG9pvz2_ts {animation: eoJZ2CG9pvz2_ts__ts 1000ms linear infinite normal forwards}@keyframes eoJZ2CG9pvz2_ts__ts { 0% {transform: translate(12px,12px) scale(1,1)} 10% {transform: translate(12px,12px) scale(1,1);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 30% {transform: translate(12px,12px) scale(1.15,1.15);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 70% {transform: translate(12px,12px) scale(1.15,1.15);animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 90% {transform: translate(12px,12px) scale(1,1)} 100% {transform: translate(12px,12px) scale(1,1)}} #eoJZ2CG9pvz2 {animation: eoJZ2CG9pvz2_s_p 1000ms linear infinite normal forwards}@keyframes eoJZ2CG9pvz2_s_p { 0% {stroke: #000} 10% {stroke: #000;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 30% {stroke: #ff1818;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 70% {stroke: #ff1818;animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 90% {stroke: #000} 100% {stroke: #000}} #eoJZ2CG9pvz3 {animation: eoJZ2CG9pvz3_c_o 1000ms linear infinite normal forwards}@keyframes eoJZ2CG9pvz3_c_o { 0% {opacity: 1} 20% {opacity: 1;animation-timing-function: step-start} 40% {opacity: 0} 90% {opacity: 1} 100% {opacity: 1}}
    ]]></svg:style>
    <g id="eoJZ2CG9pvz2_ts" transform="translate(12,12) scale(1,1)"><circle id="eoJZ2CG9pvz2" r="3.36" transform="translate(0,0)" fill="none" stroke="#000" stroke-width="1.5" stroke-miterlimit="10"/></g><g id="eoJZ2CG9pvz3"><g><path d="M7.68,3.84c0,0-.86,0-1.92,0s-1.92.86-1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M3.84,16.32c0,0,0,.86,0,1.92s.86,1.92,1.92,1.92s1.92,0,1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M16.32,3.84c0,0,.86,0,1.92,0s1.92.86,1.92,1.92s0,1.92,0,1.92" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g><path d="M20.16,16.32c0,0,0,.86,0,1.92s-.86,1.92-1.92,1.92-1.92,0-1.92,0" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g></svg>

    <svg 
    v-else-if="icon == 'camera'"
    id="eVb1EQfPwtU1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
    <svg:style type="text/css"><![CDATA[
    #eVb1EQfPwtU6 {animation: eVb1EQfPwtU6_c_o 1000ms linear infinite normal forwards}@keyframes eVb1EQfPwtU6_c_o { 0% {opacity: 0; animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 40% {opacity: 1; animation-timing-function: cubic-bezier(0.785,0.135,0.15,0.86)} 100% {opacity: 1;}}
    ]]></svg:style>
    <g><path d="M2.88,6.72h12.4c1.1,0,2,.9,2,2v6.56c0,1.1-.9,2-2,2h-8.44c-1.1,0-2-.9-2-2v-5.68" fill="none" stroke="#fff" stroke-width="1.5" 
      stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g>
        <path d="M18.03,12.66c-.41-.36-.41-.95,0-1.32L20.36,9.3c.41-.36.75-.21.75.34v4.72c0,.55-.34.7-.75.34l-2.33-2.04Z" fill="none" stroke="#fff" 
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g><g id="eVb1EQfPwtU6" opacity="0">
          <path d="M9.82,9.84c-.48-.26-.88-.03-.88.52v3.28c0,.55.39.78.88.52l3.08-1.68c.48-.26.48-.7,0-.96L9.82,9.84Z" stroke="#fff" fill="#ff1212"/></g></svg>

  </span>
</template>

<script setup>
import { useDarkModeStore } from "@/stores/dark-mode";
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#2d3748",
  },
});

const darkModeStore = useDarkModeStore();
const iconColor = computed(() =>
  !darkModeStore.darkMode ? props.color : "#ffffff"
);
</script>
