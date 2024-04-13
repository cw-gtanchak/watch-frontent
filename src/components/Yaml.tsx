import 'codemirror/mode/yaml/yaml';
import ReactCodeMirror, { IReactCodemirror } from '@uiw/react-codemirror';
import { classes } from 'utils';

export function Yaml({ value, options, ...props }: IReactCodemirror) {
  return (
    <div className={classes('bg-yaml h-[500px] w-full [&>textarea]:hidden')}>
      <ReactCodeMirror
        lazyLoadMode={false}
        value={value}
        options={{ mode: 'yaml', readOnly: true, theme: 'theme', ...options }}
        {...props}
      />
    </div>
  );
}
