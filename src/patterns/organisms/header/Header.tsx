import { observer } from 'mobx-react';
import * as React from 'react';
import ITranslationCategoryModel from '../../../models/TranslationCategory';
import RootStore from '../../../store/RootStore';
import TextForm from '../../molecules/textForm/TextForm';
import './Header.scss';

interface IHeaderProps {
    store: RootStore,
    className?: string
}

interface IHeaderState {
    addCategoryTextValue: string
}

@observer
class Header extends React.Component<IHeaderProps, IHeaderState> {
    public state: IHeaderState = {
        addCategoryTextValue: ''
    }

    public onAddCategorySubmit = () => {
        if (this.state.addCategoryTextValue === '') {
            return;
        }

        this.props.store.translationCategoryStore.create({ 
            title: this.state.addCategoryTextValue 
        });
    }
  
    public onAddCategoryTextChange = (event: any) => {
        this.setState({ addCategoryTextValue: event.target.value })
    }

    public render() {
        return (
            <header className={'o-header ' + this.props.className}>
                <section className="o-header__categories">
                    <h2>Categories</h2>
                    
                    <div className="o-header__categories__body">
                        <ul>
                            {this.props.store.translationCategoryStore.translationCategories.map((category: ITranslationCategoryModel, id: number) => {
                                return <li key={id}>
                                    <button aria-label={'Delete ' + category.title} />
                                    {category.title}
                                </li>
                            })}
                        </ul>

                        <TextForm hasButton={false}
                                  hasBackground={false}
                                  hasLabel={false}
                                  inputLabel="New Category" 
                                  placeholder="New Category"
                                  onSubmit={this.onAddCategorySubmit}
                                  onTextChange={this.onAddCategoryTextChange}/>
                    </div>
                </section>
            </header>
        )
    }
}

export { Header, IHeaderState };