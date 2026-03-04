import _Copyright from './copyright';
import { withInstall } from '@tdesign/shared-utils';
import { TdCopyrightProps } from './type';

import './style';

export * from './type';
export type CopyrightProps = TdCopyrightProps;

export const Copyright = withInstall(_Copyright);
export default Copyright;
