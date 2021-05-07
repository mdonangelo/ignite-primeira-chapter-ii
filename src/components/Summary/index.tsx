import { Container } from "./styles";
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {

    const { transactions } = useTransactions();

    const summary = transactions.reduce((accumulator, transaction) => {
        if(transaction.type === "deposit") {
            accumulator.deposits = (+accumulator.deposits) + (+transaction.amount);
            accumulator.total = (+accumulator.total) + (+transaction.amount);
        }else{
            accumulator.withdraws = (+accumulator.withdraws) + (+transaction.amount);
            accumulator.total = (+accumulator.total) - (+transaction.amount);
        }

        if(accumulator.total >= 0) {
            accumulator.typeContainer = "positiveSummary";
        }else{
            accumulator.typeContainer = "negativeSummary";
        }

        return accumulator;
        
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
        typeContainer: "positiveSummary",
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>

                <strong>
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(summary.deposits)
                    }
                </strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>

                <strong>-
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(summary.withdraws)
                    }
                </strong>
            </div>

            <div className={summary.typeContainer}>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>

                <strong>
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    )
}