<style>
  /* https://projects.lukehaas.me/css-loaders/ */
  .spinner,
  .spinner:before,
  .spinner:after {
    display: inline-block;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
  }
  .spinner {
    color: #3298dc;
    font-size: 0.25rem;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  .spinner:before,
  .spinner:after {
    content: "";
    position: absolute;
    top: 0;
  }
  .spinner:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  .spinner:after {
    left: 3.5em;
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
</style>

<div class="{`spinner ${$$props.class || ''}`}"></div>
