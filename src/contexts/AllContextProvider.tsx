import { LibraryProvider } from './Library';

function AllContextProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      <LibraryProvider>{children}</LibraryProvider>
    </>
  );
}

export default AllContextProvider;
