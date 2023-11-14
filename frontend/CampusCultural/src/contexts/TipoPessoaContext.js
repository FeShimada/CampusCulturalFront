import { createContext, useState } from "react";

export const TipoPessoaContext = createContext();

export const TipoPessoaProvider = ({children}) => {

    const [tpPessoa, setTpPessoa] = useState("professor")

    return (
        <TipoPessoaContext.Provider value={{tpPessoa}}>
            {children}
        </TipoPessoaContext.Provider>
    )
}