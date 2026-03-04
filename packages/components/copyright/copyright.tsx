import { defineComponent } from 'vue';
import { useConfig } from '../config-provider/hooks/useConfig';
import { usePrefixClass } from '@tdesign/shared-hooks';
import props from './props';

export default defineComponent({
  name: 'TCopyright',
  props,
  setup() {
    const { globalConfig } = useConfig('copyright');
    const COMPONENT_NAME = usePrefixClass('copyright');

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div>Copyright &copy; 1998 - {new Date().getFullYear()} TENCENT. All Rights Reserved.</div>
        <div>{globalConfig.value.deptText}</div>
      </div>
    );
  },
});
