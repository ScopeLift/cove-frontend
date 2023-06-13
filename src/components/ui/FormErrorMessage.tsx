const FormErrorMessage = ({ error }: { error?: string }) => {
  return (
    (error && (
      <p role='alert' className='mt-1 text-xs text-red-600'>
        {error}
      </p>
    )) || <></>
  );
};

export default FormErrorMessage;
