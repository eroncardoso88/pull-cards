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

const Cards: NextPage = (props) => {

  return (
    <Editor 
      referenceField={referenceField}
      mainKey={mainKey}
      subject={subject}
      title={title}
    />
  )
}

export default Cards