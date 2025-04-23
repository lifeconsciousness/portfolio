import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface ExpandedBodyProps {
  isCollapsing?: boolean;
}

function ExpandedBody({ isCollapsing }: ExpandedBodyProps) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [textSplit, setTextSplit] = useState<SplitType | null>(null);
  
    const setupText = () => {
      if (!textRef.current) return;
  
      if (textSplit) {
        textSplit.revert();
      }
  
      const newSplit = new SplitType(textRef.current, { types: "lines" });
      setTextSplit(newSplit);
  
      gsap.set(newSplit.lines, {
        y: 0,
        opacity: 0,
      });
  
      // Make the container visible once setup is done
      if (containerRef.current) {
        containerRef.current.classList.add('is-ready');
      }
    };
  
    useEffect(() => {
        setTimeout(() => {
            textSplit?.revert();
            setTextSplit(null);
            setupText();
        }, 650)
    }, []);

    useEffect(() => {
      if (isCollapsing && textSplit && textSplit.lines) {
        // Kill all scroll triggers before collapse animation
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        
        gsap.to(textSplit.lines, {
          y: 100,
          opacity: 0,
          duration: 0.1,
          stagger: 0.05,
          ease: "power3.in"
        });
      }
    }, [isCollapsing]);
  
    useEffect(() => {
      if (textSplit && textSplit.lines) {
        // ScrollTrigger animations
        textSplit.lines.forEach((line) => {
          gsap.to(line, {
            scrollTrigger: {
              trigger: line,
              start: "top bottom",
              end: "top center",
              toggleActions: "play none none reverse",
            },
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          });
        });
      }
  
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, [textSplit]);
  
    return (
      <div className="expanded-body" ref={containerRef}>
        <p ref={textRef} style={{ overflow: "hidden" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quam rem temporibus deserunt, quasi accusantium natus ducimus! Suscipit amet repellat sit consectetur est neque molestiae iure ipsam earum ea aliquid hic provident, iste error. Incidunt eos aliquid facere expedita sunt architecto sint voluptas necessitatibus molestiae reprehenderit, illum velit. Iusto repellat, fugiat sint voluptatum perferendis velit similique vel recusandae delectus consectetur provident dicta doloribus, accusamus nam ratione tenetur animi dolore. Et illum est dicta laboriosam voluptatum optio deleniti aut animi, delectus, veniam consequuntur labore, id adipisci qui libero autem! Eos officia, consequatur nisi dolore, voluptatem, minima ea expedita deleniti adipisci in tempore vitae? Fugit explicabo nisi nobis recusandae cupiditate, voluptatum earum vitae quod quo eaque autem quasi maiores atque, cum saepe esse debitis quisquam alias veniam distinctio tenetur sunt nesciunt? Numquam eos veritatis optio eligendi nisi eveniet vel aliquid perspiciatis, aliquam, vero earum soluta saepe aut animi alias. Aut earum at neque inventore voluptate alias harum, deleniti mollitia odio fugit in deserunt accusamus ipsum? Debitis corrupti et quam aperiam, voluptas unde ducimus dolorem voluptatum. Natus architecto quasi tenetur est cupiditate. Optio alias voluptas dolor quo fugiat in vitae asperiores sint? Deleniti neque impedit totam error veritatis asperiores. Molestiae, fugit eius. Omnis dolorem aut magni inventore eaque deserunt dolore molestiae placeat velit, debitis quibusdam, assumenda, eos commodi corporis! Laborum vero nisi iusto doloribus blanditiis! Ex aliquam neque nulla? Laboriosam perspiciatis libero aperiam sapiente possimus labore? Consequatur debitis rerum neque odio odit placeat cumque dignissimos vel velit quo ratione consequuntur praesentium nulla nam explicabo sed soluta ullam molestiae eum reiciendis, facere modi quae? Voluptas, minus. Minus, ut cumque laboriosam fuga odio ipsa? Aperiam, voluptate temporibus sunt deleniti qui sapiente asperiores quasi aliquam quaerat deserunt laborum esse, fuga odit itaque iusto suscipit! Dignissimos, ab. Atque perspiciatis dolorum ad quibusdam, aspernatur accusamus officia nam nesciunt praesentium velit repudiandae eius quia quos quis, odit harum laboriosam commodi in quae quidem similique temporibus veniam. Perspiciatis ipsa debitis hic veritatis delectus cupiditate, ad voluptatibus odio nihil nemo numquam minus corporis eaque dolorum aspernatur incidunt molestias vel accusamus ullam deleniti, deserunt doloribus eos. Dolores cum, molestiae sequi culpa voluptatum quia voluptatem animi excepturi repellat esse. Maxime fuga asperiores veniam, sit qui beatae doloremque, nemo quos laborum quisquam ratione, incidunt quibusdam nam optio inventore harum tenetur iste. Nisi voluptatibus ipsam quod quas esse sit, laudantium reprehenderit soluta doloremque ad aliquam harum eligendi dolore doloribus reiciendis quidem quia molestias, mollitia adipisci nesciunt excepturi sapiente ab. Totam labore consequatur hic, corporis modi pariatur consequuntur autem exercitationem iusto debitis, impedit minima vero id placeat distinctio delectus assumenda eos voluptatibus, nihil nobis repudiandae nemo quia beatae adipisci? Nobis odit nesciunt, doloremque dicta recusandae ad exercitationem facilis, illo expedita doloribus quae est qui. Maxime quaerat corrupti velit quam, pariatur ipsam natus placeat blanditiis labore necessitatibus sit totam nostrum id modi saepe similique rem exercitationem asperiores itaque. Ab nesciunt a esse? Alias ab repellat qui. Nobis repudiandae distinctio odio nam, neque non voluptatem odit dolor nihil eveniet? Eligendi ullam maxime assumenda ipsam vel commodi omnis optio veritatis eius aliquam a voluptatum accusantium architecto ducimus sit distinctio molestiae fugiat fuga, iste laudantium, aspernatur autem? Dolores nisi rerum, ad ratione, commodi esse corrupti reiciendis adipisci mollitia accusamus perferendis obcaecati eligendi officiis velit eius quaerat fugiat possimus ex sit recusandae aliquam, vel tempore officia necessitatibus. Provident blanditiis voluptatibus error voluptatem aperiam, natus vitae eius iusto est quo nam facilis dolor vel laborum necessitatibus ex odit ipsam dolorum odio voluptatum placeat quod consequuntur. Veritatis dolor quidem esse delectus nulla incidunt, dignissimos, consectetur pariatur maxime qui mollitia perferendis necessitatibus! Reprehenderit blanditiis dolores quae necessitatibus a iste eius aspernatur magnam modi laudantium fugiat consequatur impedit, quia ullam ducimus at dignissimos voluptate aliquid ex enim veritatis unde vitae. Error, pariatur adipisci a excepturi libero iste quas aut voluptatibus ipsum minus laborum corporis, expedita sit dolor magnam. Veritatis odit natus voluptate. Aperiam reiciendis quo saepe dolorem soluta dolores debitis rerum eaque itaque doloremque beatae architecto, mollitia quaerat quasi est officiis repudiandae incidunt fugiat tempora. Provident laboriosam excepturi explicabo numquam nobis. Delectus, necessitatibus. Rerum esse exercitationem doloribus, eveniet debitis in nobis blanditiis explicabo aspernatur beatae rem commodi suscipit amet. Minus dolore consequatur iste nam saepe culpa, tenetur hic asperiores cumque nulla reiciendis aspernatur veritatis voluptas iure sed nostrum alias voluptate. Quo odit vero quia exercitationem sit quod temporibus numquam explicabo dolorem vitae ullam qui sed, voluptatibus distinctio voluptas tempore similique est, minima laboriosam dicta. Repellat, error laborum dolore labore quam incidunt voluptate quasi eaque totam mollitia omnis voluptatem. Ratione, est dolor sunt ad adipisci magnam, culpa voluptatibus magni cum, architecto aliquid veniam porro non provident cupiditate repudiandae voluptates dolorum ex omnis mollitia harum reiciendis laudantium. Culpa qui quidem perspiciatis expedita saepe non, repellat architecto veritatis eaque officia dolore tempore, commodi accusamus quae unde nihil quaerat dolores voluptate quas quisquam? Ratione deserunt molestias voluptate dolorum tempore magnam aliquid ducimus quia quod! Minus nobis ut enim alias labore ratione pariatur earum voluptate cupiditate doloribus unde ducimus, doloremque quibusdam ad nemo accusantium a? Sit laborum eaque doloremque, illo tenetur natus harum similique iure blanditiis ipsa quaerat rerum fuga aliquid voluptatibus veniam. Molestias, quam labore dolores quisquam eligendi quia! Dolores ipsum dicta saepe enim exercitationem nam molestias esse sunt inventore fugit. Libero soluta doloribus repudiandae explicabo adipisci quidem delectus, officiis, itaque nemo quos sequi, incidunt laudantium saepe! Sequi, optio hic sapiente ipsam est saepe! Sunt modi voluptatibus commodi quia molestiae? Porro ad dignissimos et omnis quas quasi, ullam itaque enim, perferendis mollitia veritatis ex eius temporibus saepe quos! Voluptates numquam omnis quas voluptatem saepe minima sint libero nam aspernatur iste itaque, modi illo atque quisquam ipsum. Consequuntur saepe autem reiciendis facere officiis ullam laborum ab! Qui quidem consectetur ipsa illo hic aut. Magnam dolorum totam ea possimus. Consectetur, laborum necessitatibus nostrum corporis qui consequatur assumenda porro esse error velit, ullam ducimus illo voluptate sapiente minus? Magni explicabo facere dolorem aliquid quibusdam, minima, reiciendis animi laboriosam nesciunt velit repellendus, fugit quaerat. Reiciendis quis officia similique vitae officiis in alias quaerat ducimus eveniet est, odit magni illum id! Quam, consequatur a.
        </p>
      </div>
    );
  }

export default ExpandedBody;
