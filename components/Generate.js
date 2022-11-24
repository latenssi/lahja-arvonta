import { useState } from "react";
import { Permutation } from "js-combinatorics";

import useQueryValue from "../lib/useQueryValue";
import { encode, decode, encrypt, getCode, exportAsJSON } from "../lib/util";

export default function Generate() {
  const [title, setTitle] = useQueryValue("title", "");
  const [namesEncoded, setNamesEncoded] = useQueryValue("names", null);
  const [newName, setNewName] = useState("");

  const names = (decode(namesEncoded) || []).sort();

  function generate() {
    const seed = Date.now();

    const codes = names?.map((name) => ({ name, code: getCode(name, seed) }));

    const permutations = new Permutation(names);
    const sample = permutations.sample();
    const data = { sample, title, seed };
    const dataEncrypted = encrypt(encode(data));

    const baseURL = `${window.location.protocol}//${window.location.host}`;

    const urls = codes.map(({ name, code }) => ({
      name,
      url: `${baseURL}/?code=${encodeURIComponent(
        code
      )}&data=${encodeURIComponent(dataEncrypted)}`,
    }));

    const onlyUrls = urls.map(({ url }) => url);

    const editUrl = `${baseURL}/generate/?title=${encodeURIComponent(
      title
    )}&names=${namesEncoded}`;
    exportAsJSON(
      { codes, data: dataEncrypted, urls, onlyUrls, editUrl },
      title
    );
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
            <li key={`names-list-item-${name}`}>
              {name}
              <button
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  const _names = names.filter((_name) => _name !== name);
                  setNamesEncoded(encode(Array.from(new Set(_names))));
                }}
              >
                X
              </button>
            </li>
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
