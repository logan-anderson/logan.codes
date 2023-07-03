export const css = `
*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}


html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  -o-tab-size: 4;
     tab-size: 4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
}


body {
  margin: 0;
  line-height: inherit;
}
hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}



abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}


h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}



a {
  color: inherit;
  text-decoration: inherit;
}


b,
strong {
  font-weight: bolder;
}


code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 1em;
}


small {
  font-size: 80%;
}


sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}



table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}


button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}


button,
select {
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}


:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}


progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}



::-webkit-search-decoration {
  -webkit-appearance: none;
}



::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}


summary {
  display: list-item;
}



blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}


textarea {
  resize: vertical;
}



input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  color: #9ca3af;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}



button,
[role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}



img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}


img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden] {
  display: none;
}

h1 {
  position: relative;
  z-index: 10;
  margin-bottom: 0.5rem;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 900;
  letter-spacing: 0.025em;
}

@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
    line-height: 1;
  }
}

@media (min-width: 1024px) {
  h1 {
    margin-bottom: 1.5rem;
  }
}

@media (min-width: 1280px) {
  h1 {
    font-size: 3.75rem;
    line-height: 1;
  }
}

h2 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 400;
}

@media (min-width: 1024px) {
  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

h3 {
  margin-bottom: 1.5rem;
  border-bottom-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
  padding-bottom: 1rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

@media (min-width: 1024px) {
  h3 {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}

h4 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}

p {
  margin-bottom: 1.5rem;
}

a {
  --tw-text-opacity: 1;
  color: rgb(15 118 110 / var(--tw-text-opacity));
}

a:hover {
  --tw-text-opacity: 1;
  color: rgb(19 78 74 / var(--tw-text-opacity));
  text-decoration-line: underline;
}

ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style-type: disc;
  padding-left: 1rem;
}

li {
  margin-top: 0.5rem;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.top-\[-3rem\] {
  top: -3rem;
}

.-left-12 {
  left: -3rem;
}

.z-10 {
  z-index: 10;
}

.order-last {
  order: 9999;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.my-12 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.mt-5 {
  margin-top: 1.25rem;
}

.ml-3 {
  margin-left: 0.75rem;
}

.mb-0 {
  margin-bottom: 0px;
}

.mt-12 {
  margin-top: 3rem;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-10 {
  margin-top: 2.5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-16 {
  margin-top: 4rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-14 {
  margin-top: 3.5rem;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.hidden {
  display: none;
}

.h-6 {
  height: 1.5rem;
}

.h-40 {
  height: 10rem;
}

.h-8 {
  height: 2rem;
}

.min-h-screen {
  min-height: 100vh;
}

.w-6 {
  width: 1.5rem;
}

.w-40 {
  width: 10rem;
}

.w-8 {
  width: 2rem;
}

.min-w-\[20rem\] {
  min-width: 20rem;
}

.max-w-7xl {
  max-width: 80rem;
}

.shrink-0 {
  flex-shrink: 0;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-10 {
  gap: 2.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-8 {
  gap: 2rem;
}

.gap-0 {
  gap: 0px;
}

.gap-x-6 {
  -moz-column-gap: 1.5rem;
       column-gap: 1.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.border-2 {
  border-width: 2px;
}

.border-t-2 {
  border-top-width: 2px;
}

.border-b-2 {
  border-bottom-width: 2px;
}

.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}

.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.bg-teal-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(45 212 191 / var(--tw-bg-opacity));
}

.bg-stone-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(231 229 228 / var(--tw-bg-opacity));
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.pt-4 {
  padding-top: 1rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}

.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 640px) {
  .sm\:flex {
    display: flex;
  }

  .sm\:justify-between {
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .md\:col-span-3 {
    grid-column: span 3 / span 3;
  }

  .md\:flex {
    display: flex;
  }

  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\:justify-between {
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .lg\:top-\[-3\.5rem\] {
    top: -3.5rem;
  }

  .lg\:order-first {
    order: -9999;
  }

  .lg\:col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\:col-span-3 {
    grid-column: span 3 / span 3;
  }

  .lg\:my-20 {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }

  .lg\:mt-24 {
    margin-top: 6rem;
  }

  .lg\:mb-4 {
    margin-bottom: 1rem;
  }

  .lg\:mt-12 {
    margin-top: 3rem;
  }

  .lg\:mt-16 {
    margin-top: 4rem;
  }

  .lg\:mb-12 {
    margin-bottom: 3rem;
  }

  .lg\:mt-0 {
    margin-top: 0px;
  }

  .lg\:block {
    display: block;
  }

  .lg\:flex {
    display: flex;
  }

  .lg\:hidden {
    display: none;
  }

  .lg\:h-8 {
    height: 2rem;
  }

  .lg\:h-\[13rem\] {
    height: 13rem;
  }

  .lg\:min-h-screen {
    min-height: 100vh;
  }

  .lg\:w-8 {
    width: 2rem;
  }

  .lg\:w-\[13rem\] {
    width: 13rem;
  }

  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\:justify-between {
    justify-content: space-between;
  }

  .lg\:gap-24 {
    gap: 6rem;
  }

  .lg\:gap-20 {
    gap: 5rem;
  }

  .lg\:py-24 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .lg\:px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .lg\:py-12 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .lg\:pt-20 {
    padding-top: 5rem;
  }

  .lg\:text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}

@media (min-width: 1280px) {
  .xl\:col-span-3 {
    grid-column: span 3 / span 3;
  }

  .xl\:gap-24 {
    gap: 6rem;
  }
}
`;
