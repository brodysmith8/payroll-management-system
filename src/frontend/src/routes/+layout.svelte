<script>
  import '../app.css';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/androidstudio.css';
  import { storeHighlightJs } from '@skeletonlabs/skeleton';

  storeHighlightJs.set(hljs);
</script>

<slot />
