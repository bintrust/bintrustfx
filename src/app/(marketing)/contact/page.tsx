import InfoPage from "@/components/site/InfoPage";

export default function ContactPage() {
  const body = `
    <div class="bodycontainer">
        <div class="row">
            <div class="col-12 col-m-12 col-sm-12">
                <div class="col-8 col-sm-12">
                    <div class="title_container"><h4>Feel free to drop us a message.</h4><span class="decor_default"></span></div>
                    <div class="alerter"></div>
                    <form method="POST" action="#" id="contactform">
                        <p>What can we help you with?</p>
                        <div class="row">
                            <div class="col-12" style="padding:5px 0">
                                <select name="topic" style="width:100%" class="round">
                                    <option value="Trading Question">Trading Question</option>
                                    <option value="Finance Question">Finance Question</option>
                                    <option value="Technical Question">Technical Question</option>
                                </select>
                            </div>
                            <div class="col-6" style="padding:5px 0"><input type="text" name="name" placeholder="Name" required style="width:100%;" class="round" value=""></div>
                            <div class="col-6" style="padding:5px 0"><input type="text" name="email" placeholder="Email" required style="width:100%" class="round" value=""></div>
                            <div class="col-12" style="padding:5px 0"><textarea name="text" placeholder="Message" class="round" required style="width:100%; height: 120px"></textarea></div>
                            <div class="col-12" style="padding:5px 0"><button name="Submit" type="submit" id="sendform" class="btn default round">Send</button></div>
                        </div>
                    </form>
                </div>
                <div class="col-4 col-sm-12">
                    <div class="darkgrey row">
                        <div class="col-3 col-m-2 col-sm-3 center"><i class="fa fa-home fa-2x text-default"></i></div>
                        <div class="col-9 col-m-10 col-sm-9"><h6 style="line-height:30px !important">ADDRESS:</h6><p>5 Preston Court, Burton Latimer, United Kingdom, NN15 5LR</p></div>
                        <div class="col-3 col-m-2 col-sm-3 center"><i class="fa fa-envelope fa-2x text-default"></i></div>
                        <div class="col-9 col-m-10 col-sm-9"><h6 style="line-height:30px !important">EMAIL ADDRESSE:</h6><p><a class="btn" href="mailto:binatrustfx@gmail.com">binatrust support</a></p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
  return (
    <InfoPage
      titleHtml={`Contact <span class="text-default">Us</span>`}
      crumbHtml={`<a href="/">HOME</a> / CONTACT US`}
      bodyHtml={body}
      bannerContainer="bodycontainer"
    />
  );
}
