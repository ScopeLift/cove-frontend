import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import 'prismjs/components/prism-solidity';
import { Head } from '@/components/layout/Head';

const Contract = () => {
  const router = useRouter();
  const { chainName, address } = router.query;
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Head />
      <div>chain: {chainName}</div>
      <div>contract: {address}</div>

      <h1 className='mt-4 text-xl'>ABI</h1>
      <pre>
        <code className='language-javascript'>
          {`[
  'function setNumber(uint256 arg0) payable',
  'function number() payable returns (uint256 ret0)',
  'function increment() payable'
]`}
        </code>
      </pre>

      <h1 className='mt-4 text-xl'>Source Code</h1>
      <pre>
        <code className='language-solidity'>
          {`
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/// @title            Decompiled Contract
/// @author           Jonathan Becker <jonathan@jbecker.dev>
/// @custom:version   heimdall-rs v0.4.0
///
/// @notice           This contract was decompiled using the heimdall-rs decompiler.
///                     It was generated directly by tracing the EVM opcodes from this contract.
///                     As a result, it may not compile or even be valid solidity code.
///                     Despite this, it should be obvious what each function does. Overall
///                     logic should have been preserved throughout decompiling.
///
/// @custom:github    You can find the open-source decompiler here:
///                       https://github.com/Jon-Becker/heimdall-rs

contract DecompiledContract {

    /// @custom:selector    0x3fb5c1cb
    /// @custom:name        setNumber
    /// @param              arg0 ["bytes", "uint256", "int256", "string", "bytes32", "uint", "int"]
    function setNumber(uint256 arg0) public payable {
        if (msg.data.length - 0x04 < 0x20) { revert(); } else {
        }
    }

    /// @custom:selector    0x8381f58a
    /// @custom:name        number
    function number() public view payable returns (uint256) {
        var_a = storage[0];
        return(var_a);
    }

    /// @custom:selector    0xd09de08a
    /// @custom:name        increment
    function increment() public payable {
        if (storage[0] - 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) {
            storage[0] = 0x01 + storage[0];
        }
    }
}
          `}
        </code>
      </pre>
    </>
  );
};

export default Contract;
