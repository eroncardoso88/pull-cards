import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'name';
export const subject = 'card';
export const referenceField = {
  id: 1,
  name: '',
  info: '',
  deck: ''
};
export const title = "As Cartas conhecidas"
export type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" | "analysis";
interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
}

export const foreignData: IForgeignData[] = [
  {
  shouldDownload: "deck",
  replaceKeyReq: "deckId",
  replaceKeyRes: "name"
  },
]

const Cards: NextPage = (props) => {

  return (
    <Editor 
      referenceField={referenceField}
      mainKey={mainKey}
      subject={subject}
      title={title}
      helperKeys={foreignData}
    />
  )
}

export default Cards