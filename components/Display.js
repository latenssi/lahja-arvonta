import useQueryValue from "../lib/useQueryValue";
import { decode, decrypt, getCode } from "../lib/util";

export default function Display() {
  const [code, setCode] = useQueryValue("code", "");
  const [dataEncrypted, setDataEncrypted] = useQueryValue("data", "");

  const { sample, title } = decode(decrypt(dataEncrypted)) ?? {
    sample: [],
    title: "",
  };

  const pIdx = sample.findIndex((name) => getCode(name) === code);
  const recipient = pIdx !== -1 ? sample[(pIdx + 1) % sample.length] : null;

  return (
    <>
      {title ? <h1>{title}</h1> : null}
      {recipient ? (
        <p>
          <b>{recipient}</b> saa sinulta lahjan!
        </p>
      ) : null}

      <textarea
        value={dataEncrypted}
        placeholder="Syötä tapahtuma koodi"
        onChange={(e) => setDataEncrypted(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Syötä oma koodisi"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </>
  );
}