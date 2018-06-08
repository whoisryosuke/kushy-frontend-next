import axios from 'axios'

const Profile = ({ query, shop, success }) => {
    const avatar = `https://kushy-frontend-assets.s3.amazonaws.com/${shop.avatar}`;

return <div>
    <header class="SiteHeader ui red inverted top fixed menu">
        <a href="/" class="item" title="Kushy">
            <i class="icon logo" alt="Kushy logo"></i>
        </a>
        <div class="HeaderSearch tablet only">
            <form action="/search/" method="GET">
                <div class="ui search" id="HeaderSearchInput">
                    <div class="ui left icon input fluid">
                        <input type="text" placeholder="Search for cannabis products, shops, strains…" class="prompt" name="search" id="header_search"
                        />
                        <i class="search icon"></i>
                    </div>
                </div>
            </form>
        </div>

        <nav class="HeaderMenu ui right floated icon text menu">

            <div class="item">
                <a href="https://kushy.net/login" id="topLogin" class="ui inverted button">
                    Login
                </a>
            </div>
            <div class="item">
                <a href="https://kushy.net/register" id="topRegister" class="ui inverted button">
                    Register
                </a>
            </div>
        </nav>
    </header>
    <main class="App">
        <section className="ShopProfile ui container centered">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css" />
                {/* @todo: Breadcrumbs */}
                <section className="ui grid centered">
                    <section className="ShopProfile__content twelve wide computer sixteen wide mobile column">
                        <header className="ShopHeader ui grid segment">
                            <aside className="three wide computer sixteen wide mobile column">
                                <img src={ avatar } alt="{ shop.name }" className="ui medium circular image" />
                            </aside>
                            <section className="thirteen wide computer sixteen wide mobile column">
                                <h4 className="ShopHeader__type">
                                    <a href="https://kushy.net/shops/category/{ shop.categories[0].categoryName }">
                                        { shop.categories[0].categoryName }
                                    </a>
                                </h4>
                                <h2>{ shop.name }</h2>
                                <section className="ui grid">
                                    <section className="eight wide computer sixteen wide mobile column">
                                        <p className="ShopHeader__address">
                                            { shop.address ?
                                                <span>{shop.address}<br /></span> :
                                                ''
                                            }
                                            {
                                                shop.city ?
                                                    shop.city + ' ':
                                                    ''
                                            }
                                            {
                                                shop.state ?
                                                    shop.state + ' ':
                                                    ''
                                            }
                                            
                                            {
                                                shop.postal_code ?
                                                    shop.postal_code:
                                                    ''
                                            }
                                        </p>
                                        <aside className="ShopHeader__hours">
                                            <span className="ui label red" title="This shop is currently open">
                                                <i className="icon clock"></i>
                                                Open
                                            </span>
                                            {/* <span className="ui label" title="This shop is currently closed">
                                                <i className="icon clock"></i>
                                                Closed
                                            </span> */}
                                        </aside>
                                    </section>
                                    <section className="ShopHeader__btns eight wide computer sixteen wide mobile column">
                                        <a href="http://kushy.net/register" className="ui button icon red">
                                            <i className="icon comment"></i>
                                            Write Review
                                        </a>
                                    </section>
                                </section>
                            </section>
                        </header>
                        <nav className="ui menu inverted red">
                            <a href="/shops/{{ $shop->slug }}/" className="item @if($section == 'details') active @endif">Description</a>
                            <a href="/shops/{{ $shop->slug }}/menu" className="item @if($section == 'menu') active @endif">Menu</a>
                            <a href="/shops/{{ $shop->slug }}/deals/" className="item @if($section == 'deals') active @endif">Deals</a>
                            <a href="/shops/{{ $shop->slug }}/reviews/" className="item @if($section == 'reviews' || $section == '') active @endif">Reviews</a>
                            <a href="/shops/{{ $shop->slug }}/photos/" className="item @if($section == 'photos') active @endif">Photos</a>
                            <a href="/shops/{{ $shop->slug }}/events/" className="item @if($section == 'events') active @endif">Events</a>
                        </nav>
                        <section id="ShopContent">
                            
                            <article className="ui segment">
                                { shop.description }
                            </article>
                            
                        </section>

                    </section>
                    <section className="ShopProfile__sidebar four wide computer sixteen wide mobile column">
                        
                        {/* @todo: Bookmark btn */}

                        
                
                </section>
            </section>
        </section>
    </main>
</div>

}

Profile.getInitialProps = async ({ query }) => {
    let shop = {};
    let success = 'not loaded';

    await axios.get(`https://kushy.net/api/v3/shops/?filters[slug][like]=${query.slug}`)
        .then(function (response) {
            shop = response.data.data[0]
            success = 'true';
        })
        .catch(function (error) {
            success = 'error';
            shop = error;
        });
    return {
        query,
        shop,
        success
    }
}

export default Profile