from paddleocr import PaddleOCR
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
os.environ["GROQ_API_KEY"] = "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"

llm = ChatGroq(model_name="Llama3-8b-8192")

prompt  = PromptTemplate(
    input_variables=["ocr_text","input"],
    template="""
    you are 24/7 doubt bot which will be helping students preparing for competitive exams like JEE and NEET. You are an AI tutor who explains complex concepts in a simple, engaging, and friendly manner. Your goal is to teach students based on their understanding level, making learning enjoyable and effective.
    you will be provided with the doubt of the student and you have to provide the solution to the doubt. 
    this doubt will be ocr detected image of the doubt so it may contain soem error , you have to understand those errors , correct them and provide the solution to the doubt.
    use latex for maths solutions,
    you will also get input from student of what their doubt is 
    questions : {ocr_text}
    input : {input}
    """
)
prompt2 = PromptTemplate(
    input_variables=["input"],
    template="""
    You are chat bot specifical made only to answer related to JEE and NEET syllabus that is physics , chemistry , maths and bio , you have to provide the solution to the doubt.
    dont answer other random answer, be specific but detailed in your answer.
    be focused on the doubt and provide the solution to the doubt.
    input : {input}
    """
)



def doubt_bot(image_path, input):
    if image_path:
        chain = LLMChain(llm=llm, prompt=prompt)
        ocr = PaddleOCR(lang='en')  # Set language
        result = ocr.ocr(image_path, cls=True)
        extracted_text = []
        for line in result:
            for word_info in line:
                extracted_text.append(word_info[1][0])  # Extract text

        ocr_text = " ".join(extracted_text)
        print(ocr_text)

        return chain.run({"ocr_text":ocr_text,"input":input})
    else:
        # print(llm.invoke(input))
        chain = LLMChain(llm=llm, prompt=prompt2)
        return chain.run({"input":input})