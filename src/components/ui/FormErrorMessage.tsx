export const FormErrorMessage = ({ error }: { error?: Error | string }) => {
  return (
    <p role='alert' className='text-error mt-1 text-xs'>
      {typeof error === 'string' ? error : error?.message}
    </p>
  );
};
