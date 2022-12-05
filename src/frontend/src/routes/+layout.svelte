<script>
  import '../app.css';
  import hljs from 'highlight.js';
  import '../styles/obsidian_but_green500.css';
  import { storeHighlightJs } from '@skeletonlabs/skeleton';

  storeHighlightJs.set(hljs);
</script>

<slot />
