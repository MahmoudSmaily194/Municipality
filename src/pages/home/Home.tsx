import ContactForm from "./contactForm/ContactForm";
import style from "./home.module.css";
import ImageCarousel from "./imageCarousel/ImageCarousel";
const Home = () => {
  const accessItems = [
    { label: "Pay Bills", iconClass: "icon-pay" },
    { label: "Apply for Permits", iconClass: "icon-permit" },
    { label: "Trash Schedule", iconClass: "icon-trash" },
    { label: "Report a Problem", iconClass: "icon-report" },
  ];
  const events = [
    { title: "Town Council Meeting", date: "July 15, 2024" },
    { title: "Summer Concert Series", date: "July 20, 2024" },
    { title: "Community Clean-Up Day", date: "August 5, 2024" },
    { title: "Back to School Fair", date: "August 12, 2024" },
  ];
  const news = [
    {
      label: "New Park Opens in Central District",
      iconClass: "icon-park",
      date: "July 10, 2024",
      body: "The city celebrates the grand opening of Central Green Park, offering walking trails, playgrounds, and community spaces.",
    },
    {
      label: "Road Closure on Elm Street",
      iconClass: "icon-road",
      date: "July 12, 2024",
      body: "Elm Street will be closed for maintenance starting July 12. Drivers are advised to use alternate routes until work is completed.",
    },
    {
      label: "Summer Concert Series Announced",
      iconClass: "icon-concert",
      date: "July 15, 2024",
      body: "Local bands and guest performers will take the stage every Saturday evening through August. Free admission for all residents.",
    },
    {
      label: "Water Conservation Tips",
      iconClass: "icon-water",
      date: "July 14, 2024",
      body: "Learn simple ways to save water during the dry season, including efficient irrigation and household habits that reduce waste.",
    },
  ];
  return (
    <div className={style.container}>
      <section>
        <div className={style.home_intro}>
          <div className={style.home_intro_cont}>
          <h1>Manicipality of Sawirah</h1>
          <p>Your community hub for information, services, and engagement.</p>
          <button>Explore Services</button>
        </div>
        </div>
      </section>
      <section>
        <ImageCarousel />
      </section>
      <section className={style.display_flex}>
        <div className={style.quick_access}>
          <h2>Quick Access</h2>
          <div className={style.quick_access_items}>
            {accessItems.map(({ label, iconClass }) => {
              return (
                <div key={label} className={style.access_item}>
                  <div className={`${style.access_icon} ${style[iconClass]}`} />
                  <p className={style.access_label}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className={style.display_flex}>
        <div className={style.events}>
          <h2>Upcoming Events</h2>
          <div className={style.events_items}>
            {events.map((item, index) => {
              return (
                <div key={index} className={style.event}>
                  <div className={style.event_text_cont}>
                    <h1>{item.title}</h1>
                    <p className={style.event_date}> {item.date} </p>
                  </div>
                  <div className={style.event_btn}>
                    <h1>View Details</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className={style.display_flex}>
        <div className={style.news}>
          <h2>Latest News</h2>
          <div className={style.news_items}>
            {news.map((item, index) => {
              return (
                <div key={index} className={style.news_item}>
                  <div className={style.news_text_cont}>
                    <p className={style.news_date}> {item.date} </p>
                    <h1>{item.label}</h1>
                    <p className={style.news_body}> {item.body} </p>
                  </div>
                  <div
                    className={`${style.event_img} ${style[item.iconClass]}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section><ContactForm/></section>
    </div>
  );
};

export default Home;
