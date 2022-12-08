import * as React from 'react';
import classnames from 'classnames';

import { UpGrid, UpRow } from '../../Grid';
import { UpSelectOption } from '../../../Inputs/Select';
import withTheme, { WithThemeProps } from '../../../../Common/theming/withTheme';
import defaultTheme, { UpThemeInterface } from '../../../../Common/theming';
import { isEmpty } from '../../../../Common/utils';
import { generatePagesNavigation, getMaxPage } from './UpDataGridPagination.helper';
import { paginationItemStyle, paginationStyle } from './UpDataGridPagination.style';

export interface UpPaginationState {
  page: number; // Donnée calculée à partir de Skip et Take mais conservé dans l'état
  skip: number; // Nombre d'élément à retirer
  take: number; // Nombre d'élément à prendre
}

export interface UpPaginationProps {
  /** Nombre total d'éléments paginés */
  total: number;
  /** Valeur du nombre d'éléments à ignorer */
  skip?: number;
  /** Valeur du nombre d'éléments à récupérer */
  take?: number;
  /** Valeur de l'index de pagination */
  page?: number;
  /** Message à afficher pour l'information du nombre d'élément par page */
  nbByPageMessage?: string;
  /** Les options pour le nombre d'élément à récupérer */
  takes?: Array<UpSelectOption>;
  /** Activer ou non le composant de modification du nombre d'éléments à afficher par page */
  isTakeChangeEnable?: boolean;
  /** Afficher ou non les informations indiquant le positionnement dans les éléments paginés */
  isExtraInfoDisplay?: boolean;
  /** Label pour le lien 'Suivant' */
  nextLabel?: string;
  /** Label pour le lien 'Précédent' */
  previousLabel?: string;
  /** chaine de caractères utilisées comme séparateur dans la pagination*/
  paginationNavigationSeparator?: string;
  /** generate the pages navigation */
  generatePagesNavigation?: (page, total, take) => Array<number>;
  /** Affihage du nombre de résultats */
  renderResultMessage?: (theme: UpThemeInterface, from: number, to: number, total: number) => JSX.Element;
  /** Notification de du changement de l'état de la pagination */
  onPageChange: (page: number, take: number, skip: number) => void;
}

class UpDataGridPagination extends React.Component<UpPaginationProps & WithThemeProps, UpPaginationState> {
  static defaultProps: UpPaginationProps & WithThemeProps = {
    nbByPageMessage: 'Par page',
    isTakeChangeEnable: true,
    isExtraInfoDisplay: true,
    takes: [
      { id: 20, text: '20' },
      { id: 50, text: '50' },
      { id: 100, text: '100' },
      { id: 200, text: '200' },
    ],
    total: 0,
    theme: defaultTheme,
    previousLabel: 'Précédent',
    nextLabel: 'Suivant',
    generatePagesNavigation: generatePagesNavigation,
    onPageChange: (page: number, take: number, skip: number) => {},
    renderResultMessage: (theme: UpThemeInterface, from: number, to: number, total: number) => (
      <span
        style={{
          lineHeight: '1.43',
          padding: '6px 16px',
        }}
      >
        {total === 0 && <span>Aucun résultat</span>}
        {total !== 0 && <span>{`${total} résultat${total > 1 ? 's' : ''}`}</span>}
      </span>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      page: this.getPage(this.props.take || 50, this.props.skip || 0, this.props.total || 0),
      skip: this.props.skip || 0,
      take: this.props.take || 50,
    };
  }

  goToPreviousPage = () => {
    if (this.state.page > 1) {
      const previousPage = this.state.page - 1;
      const newState = {
        page: previousPage,
        skip: (previousPage - 1) * this.state.take,
      };
      this.setState(newState, () => {
        this.props.onPageChange(this.state.page, this.state.take, this.state.skip);
      });
    }
  };

  getMaxPage = () => {
    return getMaxPage(this.state.take, this.props.total);
  };

  goToNextPage = () => {
    if (this.state.page < this.getMaxPage()) {
      const nextPage = this.state.page + 1;
      const newState = {
        page: nextPage,
        skip: (nextPage - 1) * this.state.take,
      };
      this.setState(newState, () => {
        this.props.onPageChange(this.state.page, this.state.take, this.state.skip);
      });
    }
  };

  goTo = (page: number) => {
    const newState = {
      page: page,
      skip: (page - 1) * this.state.take,
    };
    this.setState(newState, () => {
      this.props.onPageChange(this.state.page, this.state.take, this.state.skip);
    });
  };

  onTakeChange = (event, data: any) => {
    if (data && data.id != this.state.take) {
      const newTake = data.id;
      const newPage = this.getPage(newTake, this.state.skip, this.props.total);
      const newSkip = newTake * (newPage - 1);

      const newState = {
        take: newTake,
        page: newPage,
        skip: newSkip,
      };
      this.setState(newState, function () {
        this.props.onPageChange(this.state.page, this.state.take, this.state.skip);
      });
    }
  };

  getPage = (take: number, skip: number, total: number) => {
    if (total != null && take >= total) {
      return 1; // Set the page to 1
    }
    return Math.floor((skip + take) / take);
  };

  componentWillReceiveProps(nextProps: UpPaginationProps) {
    if (nextProps.take != undefined) {
      const newState = {
        take: nextProps.take,
        skip: nextProps.skip,
        page: this.getPage(nextProps.take, nextProps.skip, nextProps.total),
      };
      this.setState(newState);
    }
  }

  inRange(curPage, pagevalue, distance) {
    const absRange = Math.abs(curPage - pagevalue);
    if (absRange < distance) {
      return true;
    }
    return false;
  }

  render() {
    const maxPage = this.getMaxPage();

    const from = this.state.skip + 1;
    let to = from + this.state.take - 1;
    if (to > this.props.total) to = this.props.total;

    let pageNumberNavigation = <span />;

    const pages = this.props.generatePagesNavigation(this.state.page, this.props.total, this.state.take);

    if (!isEmpty(pages)) {
      const paginationItemClass = classnames(paginationItemStyle(this.props), 'up-pagination-page');

      let PageNumber: any = <span />;

      PageNumber = pages.map((value, index) => {
        if (value === 0) {
          return (
            <li key={`page-${index}`} className={classnames(paginationItemClass, 'disabled')}>
              <a onClick={e => e.preventDefault()} href="src/Components/Containers/DataGrid#">
                {this.props.paginationNavigationSeparator ? this.props.paginationNavigationSeparator : '..'}
              </a>
            </li>
          );
        }

        return (
          <li
            key={`page-${index}`}
            className={classnames(this.state.page == value ? 'active' : '', paginationItemClass)}
            onClick={this.goTo.bind(this, value)}
          >
            <a onClick={e => e.preventDefault()} href="src/Components/Containers/DataGrid#">
              {value}
            </a>
          </li>
        );
      });

      pageNumberNavigation = (
        <nav className={'up-pagination-nav'}>
          <ul className={paginationStyle}>
            <li
              key={`page-prev`}
              className={classnames(
                'up-pagination-page-prev',
                this.state.page == 1 ? 'disabled' : 'active',
                paginationItemClass
              )}
              onClick={this.goToPreviousPage}
            >
              <a onClick={e => e.preventDefault()} href="src/Components/Containers/DataGrid#" aria-label="Previous">
                <span
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html: this.props.previousLabel,
                  }}
                />
              </a>
            </li>
            {PageNumber}
            <li
              key={`page-next`}
              className={classnames(
                'up-pagination-page-next',
                this.state.page == maxPage ? 'disabled' : 'active',
                paginationItemClass
              )}
              onClick={this.goToNextPage}
            >
              <a href="src/Components/Containers/DataGrid#" aria-label="Next" onClick={e => e.preventDefault()}>
                <span
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html: this.props.nextLabel,
                  }}
                />
              </a>
            </li>
          </ul>
        </nav>
      );
    }

    return (
      <UpGrid
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        className={'up-pagination-wrapper'}
      >
        <UpRow>
          {this.props.renderResultMessage(this.props.theme, from, to, this.props.total)}
          {pageNumberNavigation}
        </UpRow>
      </UpGrid>
    );
  }
}

export default withTheme<UpPaginationProps>(UpDataGridPagination);
