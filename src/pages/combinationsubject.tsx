import type { NextPage } from "next";
import Editor  from "@/components/Editor";


export const mainKey = 'description';
export const subject = "combination-subject";
export const referenceField = {
  "id": 1,
  "description": "",
}

export const title = "Criação de assuntos possíveis a serem perguntados"
export type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" | "analysis";
interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
}

export const foreignData: IForgeignData[] = [
]

const CombinationSubject: NextPage = (props) => {

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

export default CombinationSubject