import { useEffect, useState } from 'react';
import { BatchGridActionsMetadata, metaNetworkGridsServerSign } from '@metaio/meta-signature-util';
import { VerifyStatus } from '../../utils/status';
import VerifyResult from '../VerifyResult';
import ShowItem from '../ShowItem';

// MetaNetworkGridsServerSignValidations
type ValidatioProps = {
  metadata: BatchGridActionsMetadata
}

const MetaNetworkGridsServerSignValidations = (props: ValidatioProps) => {
  const { metadata } = props;
  const [dig, setDig] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>(VerifyStatus.Unverified);
  const [customerMetaData, setCustomerMetaData] = useState<string>('');

  useEffect(() => {
    setVerifyStatus(VerifyStatus.Unverified);
    setDig(metadata.digest);
    setCustomerMetaData(JSON.stringify(metadata));
  }, [metadata]);

  return <div className="mt-8">
    <h2 className="font-thin text-2xl text-purple-700">Grid Actions Metadata</h2>
    {dig ? <ShowItem title="Digest:" content={dig} /> : <></>}
    <div className="flex flex-col mt-2">
      <p className="font-thin text-sm text-purple-700">Body:</p>
      <textarea value={customerMetaData} onChange={(e) => {
        setVerifyStatus(VerifyStatus.Unverified);
        setCustomerMetaData(e.target.value);
      }}
        className="p-1 my-1 w-full  py-1 h-40  text-xs rounded border border-purple-300 font-thin  text-purple-400" />
      <VerifyResult status={verifyStatus} />
      <button onClick={() => {
        try {
          const result = metaNetworkGridsServerSign.verify(JSON.parse(customerMetaData));
          result ? setVerifyStatus(VerifyStatus.Verified) : setVerifyStatus(VerifyStatus.VerificationFailed)
        } catch (error) {
          setVerifyStatus(VerifyStatus.VerificationFailed)
        }
      }} className="my-1 w-full  px-4 text-xs h-10 rounded bg-purple-500 font-thin text-white hover:bg-purple-400">VALIDATE</button>
    </div>
  </div>

};

export default MetaNetworkGridsServerSignValidations;