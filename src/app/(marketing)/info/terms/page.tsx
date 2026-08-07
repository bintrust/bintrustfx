import InfoPage from "@/components/site/InfoPage";

export default function TermsPage() {
  const body = `
    <div class="bodycontainer2 padding">
        <br><br>
        <div class="title_container"><h4>Please read the following rules carefully before signing in.</h4><span class="decor_default"></span></div>
        <ol>
            <li>binatrust is totally different from its competitors trying to achieve something special starting with the website design, trading platform, and extremely functional. Since first beginning a few years ago, binatrust&nbsp;has created a name for itself between traders. The broker is magnificent for traders because of its solid mining /trading platform and a diversity of assets to invest/trade.</li>
        </ol>
    </div>
    <br><br>
`;
  return (
    <InfoPage
      titleHtml={`TERMS <span class="text-default">AND CONDITIONS</span>`}
      crumbHtml={`<a href="/">HOME</a> / TERMS AND CONDITIONS`}
      bodyHtml={body}
    />
  );
}
