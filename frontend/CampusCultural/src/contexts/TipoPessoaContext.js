import { createContext, useState } from "react";
import { TipoUsuarioEnum } from "../enumerations/tipo-usuario-enum";

export const TipoPessoaContext = createContext();

export const TipoPessoaProvider = ({children}) => {

    const [tpPessoa, setTpPessoa] = useState({
        idUsuario: '',
        tpUsuario: TipoUsuarioEnum.ALUNO
    })

    return (
        <TipoPessoaContext.Provider value={{tpPessoa, setTpPessoa}}>
            {children}
        </TipoPessoaContext.Provider>
    )
}