export interface ChatBot {
    code: string;
    stockExchange: string;
    topStocks: TopStocks[];
}

export interface TopStocks {
    code: string;
    stockName: string;
    price: number;
}

export interface Menu {
    text: string;
}