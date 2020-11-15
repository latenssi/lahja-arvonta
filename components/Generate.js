import { useState } from "react";
import { Permutation } from "js-combinatorics/commonjs/combinatorics";

import useQueryValue from "../lib/useQueryValue";
import { encode, decode, encrypt, getCode } from "../lib/util";

export default function Generate() {
  const [title, setTitle] = useQueryValue("title", "");
  const [namesEncoded, setNamesEncoded] = useQueryValue("names", null);
  const [newName, setNewName] = useState("");

  const names = (decode(namesEncoded) || []).sort();

  function generate() {
    const codes = [names?.map((name) => ({ name, code: getCode(name) }))];

    const permutations = new Permutation(names);
    const sample = permutations.sample();

    const data = { sample, title };
    const dataEncrypted = encrypt(encode(data));

    console.log(codes, dataEncrypted);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Tapahtuman nimi"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      {names?.length ? (
        <ul>
          {names?.map((name) => (
            <li key={`names-list-item-${name}`}>{name}</li>
          ))}
        </ul>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newName) {
            setNamesEncoded(encode(Array.from(new Set([...names, newName]))));
            setNewName("");
          }
        }}
      >
        <input
          type="text"
          placeholder="Henkilön nimi"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit">+</button>
      </form>
      <br />
      <button onClick={generate}>Generoi</button>
    </>
  );
}
