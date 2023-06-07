export const Verify = () => {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form action='#' method='POST'>
            {/* Repo URL */}
            <label htmlFor='repoUrl' className='block text-sm font-medium leading-6 text-gray-900'>
              Repo URL
            </label>
            <div>
              <input
                id='repoUrl'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Commit Hash */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='commitHash'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Commit Hash
              </label>
            </div>
            <div>
              <input
                id='commitHash'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Contract Address */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='contractAddress'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Contract Address
              </label>
            </div>
            <div>
              <input
                id='contractAddress'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Build Configuration */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Build Configuration
              </label>
            </div>
            <div className='flex items-center'>
              <div>
                <label className='block text-sm leading-6 text-gray-400'>Framework</label>
                <select
                  required
                  autoComplete='country-name'
                  className='h-9 w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option>Foundry</option>
                </select>
              </div>
              <div className='ml-2 flex-grow'>
                <label className='block text-sm leading-6 text-gray-400'>Profile Name</label>
                <input
                  required
                  placeholder='default'
                  className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* Creation Transaction Hashes */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Creation Transaction Hashes
              </label>
            </div>
            <div className='flex items-center'>
              <div>
                <label className='block text-sm leading-6 text-gray-400'>Chain</label>
                <select
                  required
                  autoComplete='country-name'
                  className='h-9 w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option>Foundry</option>
                </select>
              </div>
              <div className='ml-2 flex-grow'>
                <label className='block text-sm leading-6 text-gray-400'>Transaction Hash</label>
                <input
                  required
                  placeholder='default'
                  className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* Form Submit Button */}
            <button
              type='submit'
              className='mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
