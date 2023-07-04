export const css = `









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


.grid {
  display: grid;
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
