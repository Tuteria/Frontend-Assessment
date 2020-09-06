import { Spinner } from "@chakra-ui/core";

export default function Loader({ label }) {
  return (
    <div style={{width: '40%', margin: '0 auto', textAlign: 'center',}}>
      <h2 style={{fontSize: '190%', marginTop:'10%'}}>{label}</h2>
      <Spinner style={{borderRadius: '100%', width: '30%', margin: '15% auto', }} size="xl" />
    </div>
  )
}
