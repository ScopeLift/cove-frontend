const FormErrorMessage = ({ error }: { error?: string }) => {
  return (
    (error && (
      <p role='alert' className='text-error mt-1 text-xs'>
        {error}
      </p>
    )) || <></>
  );
};

export default FormErrorMessage;
