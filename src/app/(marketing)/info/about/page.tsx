import InfoPage from "@/components/site/InfoPage";

export default function AboutPage() {
  const body = `
    <div class="bodycontainer2 padding">
        <div class="title_container">
            <h4>About binatrust || Sparkup Your Coin</h4>
            <span class="decor_default"></span>
        </div>
        <h4 style="box-sizing: border-box; color: #666666; font-size: 24px; margin: 5px 0px; padding: 0px; border: 0px; vertical-align: baseline;">&nbsp;</h4>
        <h3 style="text-align: center;"><strong>binatrust INVESTMENT NETWORK&nbsp;</strong></h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: center;">www.binatrust.online is a Limited Liability company</h3>
        <h3 style="text-align: center;">binatrust INVESTMENT NETWORK</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">This is a mining platform or pool where you invest your money in Bitcoin and your Bitcoin investment undergoes a regular mining operation 24hrs/day making it possible for you to increase your financial capacity.&nbsp;</h3>
        <h3 style="text-align: justify;">This platform helps you to stay financially relevant, it gives you a financial freedom and also, it helps you to secure a financial future.&nbsp;</h3>
        <h3 style="text-align: justify;">The platform is stress-free and it gives you time to attend to your other needs.</h3>
        <h3 style="text-align: justify;">Our Job at binatrust LLC is to guide and show our clients how to invest and make money through this plartform without the need of a third party.</h3>
        <h3 style="text-align: justify;">Bitcoin mining operation is carried out 24hr/day generating constant steady interest on the invested bitcoin. An accumulated interest rate is distributed evenly accross every wallet registered and connected to the mining network.</h3>
        <h3 style="text-align: justify;">At binatrust we have the best group of mining expert and we mine using the best mining hardware( CGminer) which makes it possible for our clients to get the best mining services.</h3>
        <h3 style="text-align: justify;">Every wallet connected to the mining network gets a steady interest return which makes this investment platform more profiting and beneficial.</h3>
        <h3 style="text-align: justify;">Once your account is created and registered, your wallet will be credited with a start up bonus interest&nbsp; of 0.0004btc from binatrust</h3>
        <h3 style="text-align: justify;">You can monitor and control your investment on binatrust 24hrs a day.</h3>
        <h3 style="text-align: justify;">At binatrust mining network we will never ask our clients for money, we always advise our clients to disregard any such person requesting money from them.&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">WITHDRAWAL METHOD</h3>
        <h3 style="text-align: justify;">You can make a withdrawal after 7 days from your investment period.</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">COMMISSION AND COMPENSATION</h3>
        <h3 style="text-align: justify;">At binatrust we will never ask you to send money to us neither would any of our online agents request money from you.&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">&nbsp;</h3>
        <h3 style="text-align: justify;">NOTE: The Bitcoin miner compensation/commission is 25% of your weekly accumulated interest.</h3>
        <h3 style="text-align: justify;">Everytime you make a withdrawal, you are required to pay 25% mining compensation of your total weekly accumulated interest to the Bitcoin miner.&nbsp;</h3>
        <h3 style="text-align: justify;">The 25% give back, is a compensation fee for the work that the Bitcoin miners do to help you multiply your income. Is a way of saying thank you for the good work done every week.</h3>
    </div>
`;
  return (
    <InfoPage
      titleHtml={`About <span class="text-default"> binatrust || Sparkup Your Coin</span>`}
      crumbHtml={`<a href="/">HOME</a> / ABOUT US`}
      bodyHtml={body}
    />
  );
}
