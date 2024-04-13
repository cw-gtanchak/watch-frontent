import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import ReactCodeMirror, { IEditorInstance, IReactCodemirror } from '@uiw/react-codemirror';
import { classes } from 'utils';

interface Props extends Omit<IReactCodemirror, 'ref'> {
  className?: string;
  ref?: React.MutableRefObject<IEditorInstance | undefined>;
}

export function CodeEditor({ className, value, options, ref, ...props }: Props) {
  return (
    <div className={classes('h-full w-full pt-4 [&>textarea]:hidden', className)}>
      <ReactCodeMirror
        lazyLoadMode={false}
        value={value}
        options={{ theme: 'theme', ...options }}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export function Sql(props: Props) {
  return <CodeEditor {...props} options={{ mode: 'sql', ...props.options }} />;
}

export function Jsonn(props: Props) {
  return <CodeEditor {...props} options={{ mode: 'javascript', ...props.options }} />;
}

export function QueryResult(props: Props) {
  return <CodeEditor {...props} options={{ readOnly: 'nocursor', ...props.options }} />;
}