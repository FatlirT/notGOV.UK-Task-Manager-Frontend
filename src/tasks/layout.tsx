import Header from "../components/Header";
import Layout from "../layout";

const TasksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        {/* Navigation */}
        <div className="govuk-header__content">
          <nav className="govuk-header__navigation" aria-label="Menu">
            <ul
              id="navigation"
              className="govuk-header__navigation-list flex gap-6 ml-6"
            >
              <li className="govuk-header__navigation-item">
                <a className="govuk-header__link" href="/tasks">
                  Tasks list
                </a>
              </li>

              <li className="govuk-header__navigation-item">
                <a className="govuk-header__link" href="/tasks/new">
                  Create task
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </Header>
      <Layout>{children}</Layout>
    </>
  );
};

export default TasksLayout;
