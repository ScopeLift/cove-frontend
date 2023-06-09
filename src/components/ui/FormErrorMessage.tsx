const FormErrorMessage = ({ error }: { error?: string }) => {
  return error ? (
    <p role='alert' className='text-sm text-red-600'>
      {error}
    </p>
  ) : (
    <></>
  );
};

export default FormErrorMessage;
