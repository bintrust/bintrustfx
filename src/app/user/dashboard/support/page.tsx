export default function SupportPage() {
  const html = `
    <div class="row mb-5">
        <div class="col text-center card bg-dark p-3">
            <h1 class="title1 text-light">binatrust Support</h1>
            <div class="sign-up-row widget-shadow text-light">
                <h4 class="text-light">For inquiries, suggestions or complains. Mail us at</h4>
                <h5 class="text-light mt-3"><a class="kbtn btn" href="mailto:binatrust.supp0rt@gmail.com">binatrust support</a></h5>
                <h4 class="text-light">or reach us on Whatsapp</h4>
                <h5 class="text-light mt-3"><a class="kbtn kbtn--no-background btn" href="https://wa.me/+19547195189" target="_blank"><img src="/assets/images/icons8-whatsapp-48.png" alt="Whatsapp icon to chat with support"/></a></h5>
            </div>
        </div>
    </div>
`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
