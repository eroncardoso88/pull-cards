import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'name';
export const subject = 'deck';
export const referenceField = {
  id: 1,
  name: '',
};
export const title = "Os Decks Conhecidos"
export const foreignKeys = [
  {

  }
]

const Decks: NextPage = (props) => {

  return (
    <Editor 
      referenceField={referenceField}
      mainKey={mainKey}
      subject={subject}
      title={title}
    />
  )
}

export default Decks